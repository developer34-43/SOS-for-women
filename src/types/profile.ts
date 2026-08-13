export interface EmergencyContact {
  name: string;
  phone: string;
  relation: string;
}

export interface Profile {
  id: string;
  name: string;
  email: string;
  phone: string;
  profile_image: string;
  blood_group: string;
  emergency_contacts: EmergencyContact[];
  medical_notes: string;
  language: string;
  theme: string;
  email_verified: boolean;
  created_at: string;
  last_login: string;
}

/** Shape returned by Supabase before we normalize nullable fields. */
type ProfileRow = Partial<Profile> & { id: string };

export type ProfileUpdate = Partial<
  Pick<
    Profile,
    | 'name'
    | 'phone'
    | 'profile_image'
    | 'blood_group'
    | 'emergency_contacts'
    | 'medical_notes'
    | 'language'
    | 'theme'
  >
>;

export const DEFAULT_PROFILE: Omit<Profile, 'id' | 'created_at' | 'last_login'> = {
  name: '',
  email: '',
  phone: '',
  profile_image: '',
  blood_group: '',
  emergency_contacts: [],
  medical_notes: '',
  language: 'en',
  theme: 'dark',
  email_verified: false,
};

/** Coerce a raw Supabase row into a fully-populated Profile. */
export function normalizeProfile(row: ProfileRow | null): Profile | null {
  if (!row) return null;
  return {
    id: row.id,
    name: row.name ?? '',
    email: row.email ?? '',
    phone: row.phone ?? '',
    profile_image: row.profile_image ?? '',
    blood_group: row.blood_group ?? '',
    emergency_contacts: row.emergency_contacts ?? [],
    medical_notes: row.medical_notes ?? '',
    language: row.language ?? 'en',
    theme: row.theme ?? 'dark',
    email_verified: row.email_verified ?? false,
    created_at: row.created_at ?? new Date().toISOString(),
    last_login: row.last_login ?? new Date().toISOString(),
  };
}
