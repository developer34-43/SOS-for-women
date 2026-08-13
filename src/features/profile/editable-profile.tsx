'use client';

import { useState } from 'react';
import {
  User as UserIcon,
  Phone,
  Droplet,
  Languages,
  Plus,
  Trash2,
  Check,
  X,
  ShieldCheck,
  Mail,
} from 'lucide-react';
import { GlassCard } from '@/components/card';
import { PrimaryButton } from '@/components/primary-button';
import type { EmergencyContact, Profile, ProfileUpdate } from '@/types/profile';
import { cn } from '@/lib/utils';

interface EditableProfileProps {
  profile: Profile;
  saving: boolean;
  onSave: (patch: ProfileUpdate) => Promise<void>;
}

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'];
const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'Hindi' },
  { code: 'es', label: 'Spanish' },
  { code: 'fr', label: 'French' },
];

export function EditableProfile({ profile, saving, onSave }: EditableProfileProps) {
  const [name, setName] = useState(profile.name);
  const [phone, setPhone] = useState(profile.phone);
  const [bloodGroup, setBloodGroup] = useState(profile.blood_group || 'Unknown');
  const [language, setLanguage] = useState(profile.language);
  const [medicalNotes, setMedicalNotes] = useState(profile.medical_notes);
  const [contacts, setContacts] = useState<EmergencyContact[]>(
    profile.emergency_contacts ?? [],
  );

  const dirty =
    name !== profile.name ||
    phone !== profile.phone ||
    bloodGroup !== (profile.blood_group || 'Unknown') ||
    language !== profile.language ||
    medicalNotes !== profile.medical_notes ||
    JSON.stringify(contacts) !== JSON.stringify(profile.emergency_contacts ?? []);

  async function handleSave() {
    await onSave({
      name,
      phone,
      blood_group: bloodGroup,
      language,
      medical_notes: medicalNotes,
      emergency_contacts: contacts,
    });
  }

  function addContact() {
    setContacts((c) => [...c, { name: '', phone: '', relation: '' }]);
  }

  function updateContact(index: number, field: keyof EmergencyContact, value: string) {
    setContacts((c) =>
      c.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact)),
    );
  }

  function removeContact(index: number) {
    setContacts((c) => c.filter((_, i) => i !== index));
  }

  return (
    <div className="space-y-4">
      {/* Personal info */}
      <Section title="Personal information">
        <InputRow
          icon={UserIcon}
          label="Full name"
          value={name}
          onChange={setName}
          placeholder="Your name"
        />
        <Divider />
        <StaticRow icon={Mail} label="Email" value={profile.email} />
        <Divider />
        <InputRow
          icon={Phone}
          label="Phone"
          value={phone}
          onChange={setPhone}
          placeholder="+91 90000 00000"
          type="tel"
        />
      </Section>

      {/* Medical */}
      <Section title="Medical">
        <SelectRow
          icon={Droplet}
          label="Blood group"
          value={bloodGroup}
          options={BLOOD_GROUPS}
          onChange={setBloodGroup}
        />
        <Divider />
        <div className="py-3">
          <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/45">
            Medical notes
          </label>
          <textarea
            value={medicalNotes}
            onChange={(e) => setMedicalNotes(e.target.value)}
            placeholder="Allergies, conditions, medications…"
            rows={3}
            className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-3.5 py-2.5 text-sm text-white placeholder:text-white/35 focus:border-primary/60 focus:outline-none"
          />
        </div>
      </Section>

      {/* Emergency contacts */}
      <Section title="Emergency contacts">
        <div className="space-y-2 py-2">
          {contacts.length === 0 && (
            <p className="py-2 text-center text-sm text-white/40">
              No contacts yet. Add someone you trust.
            </p>
          )}
          {contacts.map((c, i) => (
            <div
              key={i}
              className="space-y-2 rounded-2xl bg-white/[0.04] p-3"
            >
              <div className="flex items-center gap-2">
                <input
                  value={c.name}
                  onChange={(e) => updateContact(i, 'name', e.target.value)}
                  placeholder="Name"
                  className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <button
                  type="button"
                  onClick={() => removeContact(i)}
                  aria-label="Remove contact"
                  className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-destructive/10 text-destructive transition-colors hover:bg-destructive/20"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  value={c.phone}
                  onChange={(e) => updateContact(i, 'phone', e.target.value)}
                  placeholder="Phone"
                  type="tel"
                  className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
                <input
                  value={c.relation}
                  onChange={(e) => updateContact(i, 'relation', e.target.value)}
                  placeholder="Relation"
                  className="min-w-0 flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white placeholder:text-white/35 focus:outline-none focus:ring-1 focus:ring-primary/50"
                />
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={addContact}
            className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-white/15 py-2.5 text-sm font-medium text-white/60 transition-colors hover:border-primary/40 hover:text-primary"
          >
            <Plus className="h-4 w-4" /> Add contact
          </button>
        </div>
      </Section>

      {/* Preferences */}
      <Section title="Preferences">
        <SelectRow
          icon={Languages}
          label="Language"
          value={LANGUAGES.find((l) => l.code === language)?.label ?? 'English'}
          options={LANGUAGES.map((l) => l.label)}
          onChange={(label) => {
            const found = LANGUAGES.find((l) => l.label === label);
            if (found) setLanguage(found.code);
          }}
        />
      </Section>

      {/* Save bar */}
      {dirty && (
        <div className="sticky bottom-0 z-20 -mx-5 px-5 pb-4 pt-3">
          <div className="glass-strong flex items-center gap-3 rounded-2xl p-3">
            <span className="flex-1 text-sm text-white/70">Save changes?</span>
            <PrimaryButton size="sm" loading={saving} onClick={handleSave} leftIcon={!saving && <Check className="h-4 w-4" />}>
              Save
            </PrimaryButton>
          </div>
        </div>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 px-1 text-xs font-semibold uppercase tracking-wider text-white/45">
        {title}
      </h2>
      <GlassCard className="px-4 py-1">{children}</GlassCard>
    </div>
  );
}

function Divider() {
  return <div className="h-px bg-white/8" />;
}

function InputRow({
  icon: Icon,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
}: {
  icon: typeof UserIcon;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8 text-primary">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/45">{label}</p>
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-sm font-medium text-white placeholder:text-white/30 focus:outline-none"
        />
      </div>
    </div>
  );
}

function StaticRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8 text-primary">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/45">{label}</p>
        <p className="truncate text-sm font-medium text-white">{value}</p>
      </div>
    </div>
  );
}

function SelectRow({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}: {
  icon: typeof UserIcon;
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 py-3">
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/8 text-primary">
        <Icon className="h-[18px] w-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs text-white/45">{label}</p>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full cursor-pointer bg-transparent text-sm font-medium text-white focus:outline-none"
        >
          {options.map((o) => (
            <option key={o} value={o} className="bg-[#0f1a2e] text-white">
              {o}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
