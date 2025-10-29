import PageHeader from "@/components/layout/page-header";
import SettingsForm from "@/components/forms/settings-form";
import UploadPosData from "@/components/forms/upload-pos-data";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Settings"
        description="Manage your restaurant settings and preferences"
      />
      <div className="max-w-2xl space-y-6">
        <UploadPosData />
        <SettingsForm />
      </div>
    </div>
  );
}
