import Layout from "../layouts";

import PageHeader from "../common/PageHeader";
import DropdownSelect from "../common/DropdownSelect";
import CollapseList from "../common/CollapseList";
import CheckboxWithLabel from "../common/CheckboxWithLabel";
import { Label } from "../ui/label";
import InfoCard from "../common/InfoCard";
import PageAction from "../common/PageAction";
import Link from "../common/Link";
import { viewAtom } from "../store";
import { useAtom } from "jotai";
import DetailInfoCard from "../common/DetailInfoCard";
import DataWithLabel from "../common/DataWithLabel";
import ViewToggle from "../common/ViewToggle";
import PagePagination from "../common/PagePagination";
import SearchForm from "../common/SearchForm";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import { ChevronRight, Copy, Heart, Mail } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

type Props = {};

const SummaryPageAction = () => {
  return (
    <div className="flex flex-col space-y-4">
      <div>
        <Label>Record per page</Label>
        <DropdownSelect title={"Select records number"} options={[]} />
      </div>
      <div>
        <Label>Sort by</Label>
        <DropdownSelect title={"Sort by"} options={[]} />
      </div>

      <div>
        <Label>Filter by</Label>
        <div className="flex flex-col space-y-4">
          <CollapseList title="Date" expand={true}>
            <div className="space-y-3  border-t p-4">
              <CheckboxWithLabel label="1994" checked />
              <CheckboxWithLabel label="1995" />
              <CheckboxWithLabel label="1996" />
              <CheckboxWithLabel label="1997" />
            </div>
          </CollapseList>
        </div>
      </div>
    </div>
  );
};
const Summary = (props: Props) => {
  const [view] = useAtom(viewAtom);
  const [mobileFilter, setMobileFilter] = useState(false);
  return (
    <Layout>
      <div className="rounded-[0.5rem] border bg-background shadow-md md:shadow-xl h-full flex-col flex w-full my-12">
        <PageAction
          breadcrumbs={[
            { label: "Home", url: "/" },
            {
              label: "Summary",
              url: "/summary",
              active: true,
            },
          ]}
        >
          <div className="flex w-full flex-row space-x-2 justify-end">
            <SearchForm
              searchURL={""}
              inputName={""}
              className="my-0 w-full md:max-w-md mx-0 min-w-80"
            />
            <Separator orientation="vertical" />
            <ViewToggle />
          </div>
        </PageAction>

        <section>
          <div className="mx-auto  py-4   sm:py-12  container flex flex-col">
            <PageHeader
              heading={'240 results for "Test"'}
              subHeading="Displaying 1-40 of 240"
            />
            <div className="mt-8 block lg:hidden">
              <Button
                className="flex cursor-pointer items-center gap-2 border-b "
                onClick={() => setMobileFilter(true)}
              >
                <span className="font-medium"> Filters & Sorting </span>
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Sheet open={mobileFilter} onOpenChange={setMobileFilter}>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Filters & Sorting</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <SummaryPageAction />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <div className="mt-4 lg:mt-8 lg:grid lg:grid-cols-4 lg:items-start lg:gap-8 ">
              <div className="hidden space-y-4 lg:block col-span-1">
                <SummaryPageAction />
              </div>
              <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {view === "grid" &&
                  new Array(15).fill("").map((e, i) => (
                    <InfoCard
                      key={i}
                      title={<Link href="/">'A test record'</Link>}
                      description={"ID: F12.4.1.2512"}
                      thumbnail="https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      footer={
                        <div className="flex h-4 items-center space-x-4 w-full justify-evenly ">
                          <Button variant="ghost" size="icon">
                            <Heart className="h-4 w-4 text-primary" />
                          </Button>
                          <Separator orientation="vertical" />
                          <Button variant="ghost" size="icon">
                            <Copy className="h-4 w-4 text-primary" />
                          </Button>
                          <Separator orientation="vertical" />
                          <Button variant="ghost" size="icon">
                            <Mail className="h-4 w-4 text-primary" />
                          </Button>
                        </div>
                      }
                    />
                  ))}

                {view === "list" &&
                  new Array(15).fill("").map((e, i) => (
                    <DetailInfoCard
                      key={i}
                      title={<Link href="/">'A test record'</Link>}
                      className="col-span-3"
                      thumbnail="https://images.unsplash.com/photo-1554907984-15263bfd63bd?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      footer={
                        <div>
                          <Separator />
                          <div className="flex h-12 items-center space-x-4 w-full justify-evenly ">
                            <Button variant="ghost" size="icon">
                              <Heart className="h-4 w-4 text-primary" />
                            </Button>
                            <Separator orientation="vertical" />
                            <Button variant="ghost" size="icon">
                              <Copy className="h-4 w-4 text-primary" />
                            </Button>
                            <Separator orientation="vertical" />
                            <Button variant="ghost" size="icon">
                              <Mail className="h-4 w-4 text-primary" />
                            </Button>
                          </div>
                        </div>
                      }
                    >
                      <div className="mt-4">
                        <DataWithLabel label={"Date"} items={["1242"]} />
                        <DataWithLabel
                          label={"Reference Code"}
                          items={["F12.12.15"]}
                        />{" "}
                        <DataWithLabel label={"Level"} items={["Item"]} />
                        <DataWithLabel label={"Scope"} items={["1242"]} />
                      </div>
                    </DetailInfoCard>
                  ))}
              </div>

              <div className="col-span-4 mt-4">
                <PagePagination
                  previous="/"
                  next={"/"}
                  items={[
                    { url: "12", active: true },
                    { url: "12" },
                    { url: "41" },
                  ]}
                  renderItem={(item, index) => (
                    <span key={index}>{index + 1}</span>
                  )}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Summary;
