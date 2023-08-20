import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/context/AuthProvider";

const Setting = () => {
  const { user } = useAuth();
  return (
    <div className="sceneContainer">
      <div className="sceneHeader">
        <h1>Settings</h1>
        <p>Get your Preferences in your hands</p>
        <br />
      </div>
      <Tabs defaultValue="account" className="w-[400px] mt-3">
        <TabsList>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="billing">Billings</TabsTrigger>
          <TabsTrigger value="affiliate">Affiliates</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          Make changes to your account here.
        </TabsContent>
        <TabsContent value="preferences">
          Change your preferences here.
        </TabsContent>
        <TabsContent value="billing">
          Change your billing acounts here.
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Setting;
