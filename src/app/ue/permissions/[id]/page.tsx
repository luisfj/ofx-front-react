"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { NextUIProvider } from "@nextui-org/system";
import TableUeInvites from "./components/tableUeInvites";
import TableUeUsers from "./components/tableUeUsers";


export default function PermissionsHomePage({ params }: { params: { id: number } }) {

  return (
    <>
      <div className="mt-8 w-full">
        <NextUIProvider>
          <Tabs defaultValue="users" className="w-[980px]">
            <TabsList>
              <TabsTrigger value="users">Usuários Com Acesso</TabsTrigger>
              <TabsTrigger value="invites">Convites</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
              <Card>
                <CardHeader className="text-lg">
                  <div className="text-lg">Usuários com acesso a UE</div>
                </CardHeader>
                <CardContent>
                  <TableUeUsers idUe={params.id} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="invites">
              <Card>
                <CardHeader>
                  <div className="text-lg">Convites de acesso a UE</div>
                </CardHeader>
                <CardContent>
                  <TableUeInvites idUe={params.id} />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </NextUIProvider>
      </div>
    </>
  );
}
