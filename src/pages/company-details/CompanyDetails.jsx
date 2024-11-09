import PageBanner from "@/components/ui/PageBanner";
import CompanyInfo from "./components/CompanyInfo";
import CompanySidebar from "./components/CompanySidebar";
import { useParams } from "react-router-dom";
import { useGetCompanyQuery } from "@/redux/api/company";
import { userFormatText } from "@/utils/userFormatText";

export default function CompanyDetails() {
  const { id } = useParams();
  const { data } = useGetCompanyQuery(id);

  const companyInfo = data?.data?.company;
  const availableJobs = data?.data?.availableJobs;
  const images = companyInfo?.galleries || []; 
  const videoUrl = companyInfo?.videoURL || ''; 

  return (
    <div className="max_container my-20">
      <div className="grid grid-cols-12 gap-5">
        {/* --------------- Main Content --------------- */}
        <div className="col-span-12 lg:col-span-8 xl:col-span-9 mb-8 lg:mb-0">
          {/* +++ Company Banner +++ */}
          <PageBanner
            rounded="rounded-xl"
            title={companyInfo?.name}
            banner={companyInfo?.banner}
            brandImg={companyInfo?.logo}
            subtitle={userFormatText(companyInfo?.location)}
          />

          {/* +++ Company Info +++ */}
          <CompanyInfo
            companyInfo={companyInfo}
            availableJobs={availableJobs}
            images={images}
            videoUrl={videoUrl}
          />
        </div>

        {/* --------------- Sidebar Content --------------- */}
        <div className="col-span-12 lg:col-span-4 xl:col-span-3">
          <CompanySidebar companyInfo={companyInfo} />
        </div>
      </div>
    </div>
  );
}
