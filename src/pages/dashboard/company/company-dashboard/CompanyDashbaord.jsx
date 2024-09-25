import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EaseRecruitAreaChart from "@/components/dashboard/EaseRecruitAreaChart";
import RecentCandidateTable from "./components/RecentCandidateTable";
import LinkWithArrow from "@/components/ui/LinkWithArrow";
import RecentNotificationRow from "@/components/dashboard/RecentNotificationRow";
import { useGetAllNotificationsQuery } from "@/redux/api/notification";
import GetDashboardStats from "@/helpers/GetDashboardStats";
import {
  useApplicationStatQuery,
  useProfileViewStatQuery,
} from "@/redux/api/dashboard";
import { useMeQuery } from "@/redux/api/user";

export default function CompanyDashbaord() {
  const { data } = useGetAllNotificationsQuery();
  const notificationsData = data?.data?.notifications;

  const { data: applicationData } = useApplicationStatQuery();
  const { data: profileViewData } = useProfileViewStatQuery();
  const { data: userData } = useMeQuery();

  const applicationStat = applicationData?.data?.stats;
  const profileViewStat = profileViewData?.data?.stats;
  const applicationCount = applicationData?.data?.total;
  const profileViewCount = profileViewData?.data?.total;

  return (
    <div className="">
      <DashboardHeader
        title="Dashboard"
        subtitle={`Welcome, ${userData?.data?.name || "user"}!`}
      />

      {/* Stats Cards */}
      <GetDashboardStats />

      {/* Info Charts */}
      <div className="mt-12 grid grid-cols-12 gap-12">
        <div className="col-span-6">
          <EaseRecruitAreaChart
            quantity={profileViewCount}
            data={profileViewStat}
            syncId="profile-visitor"
            dataKey="views"
            color="#0070C9"
            title="Company's Job Visitors"
          />
        </div>
        <div className="col-span-6">
          <EaseRecruitAreaChart
            quantity={applicationCount}
            syncId="application"
            dataKey="applications"
            data={applicationStat}
            color="#FFA823"
            title="Applications"
          />
        </div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-12 gap-7 mt-12">
        <div className="col-span-6">
          <h2 className="home_section_title">Recent Notifications</h2>
          {notificationsData?.length ? (
            <>
              <div>
                {notificationsData?.slice(0, 5)?.map((notification, i) => (
                  <RecentNotificationRow key={i} notification={notification} />
                ))}
              </div>
              <LinkWithArrow display="Read all" link="notifications" />
            </>
          ) : (
            <p className="opacity-[0.8]">No recent Messages</p>
          )}
        </div>
        <div className="col-span-6">
          <h2 className="home_section_title">Recent Messages</h2>
          <p className="opacity-[0.8]">No recent Messages</p>
        </div>
      </div>

      {/* Recent Candidates */}
      <div className="mt-12">
        <h2 className="home_section_title">Recent Candidates</h2>
        <div>
          <RecentCandidateTable />
          <LinkWithArrow display="View all" link="candidates" />
        </div>
      </div>
    </div>
  );
}
