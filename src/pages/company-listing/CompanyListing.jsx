import ListingPageContainer from "@/components/other/listing-page-container/ListingPageContainer";
import SidebarSearch from "@/components/other/sidebar-search/SidebarSearch";
import PageHeader from "@/components/ui/PageHeader";
import CompanyCard from "./components/CompanyCard";
import { useGetAllCompaniesQuery } from "@/redux/api/company";
import { useState } from "react";
import { ENUM_MODULE } from "@/enums/module";

export default function CompanyListing() {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");

  const query = {};
  if (name) query["name"] = name;
  if (location) query["location"] = location;
  if (industry) query["industry"] = industry;

  const { data, isLoading } = useGetAllCompaniesQuery({ ...query });
  const companiesData = data?.data;
  const totalCompanies = data?.meta?.total;

  const onSearchSubmit = (data) => {
    const { name, location, industry } = data;

    if (name) setName(name);
    if (location) setLocation(location);
    if (industry) setIndustry(industry);
  };

  return (
    <div className="my-20">
      <PageHeader
        className="bg-secondaryLight"
        title="Companies"
        subtitle="Work for the best companies in the world"
      />

      <ListingPageContainer
        sidebar={
          <div>
            <SidebarSearch
              onhandleSubmit={onSearchSubmit}
              moduleName={ENUM_MODULE.COMPANY}
              bg="bg-secondaryLight"
            />
          </div>
        }
        cards={companiesData?.map((company, i) => (
          <CompanyCard key={i} company={company} />
        ))}
        isLoading={isLoading}
        moduleName={ENUM_MODULE.COMPANY}
        total={totalCompanies}
      />
    </div>
  );
}
