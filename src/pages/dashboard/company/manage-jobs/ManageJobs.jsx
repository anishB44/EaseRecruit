import { useState } from "react";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import EaseRecruitTable from "@/components/dashboard/EaseRecruitTable";
import { FaEye, FaGlobeAsia } from "react-icons/fa";
import { Link } from "react-router-dom";
import { RiEdit2Fill } from "react-icons/ri";
import DashboardBadge from "@/components/dashboard/DashboardBadge";
import TableSearchBar from "@/components/dashboard/TableSearchBar";
import { useMyJobsQuery } from "@/redux/api/company";
import { formatDate } from "@/utils/formatDate";
import { userFormatText } from "@/utils/userFormatText";
import { useUpdateJobMutation } from "@/redux/api/jobApi";
import { catchAsync } from "@/helpers/catchAsync";
import toast from "react-hot-toast";
import { useDeboune } from "@/hooks/useDebounce";
import { MdBlock } from "react-icons/md";
import { ENUM_JOB_STATUS } from "@/enums/jobOffer";

export default function ManageJobs() {
  const columns = [
    { className: "w-[1%]", title: "" },
    { className: "w-[25%]", title: "Title" },
    { className: "w-[15%]", title: "Industry" },
    { className: "w-[20%]", title: "Type" },
    { className: "w-[12%]", title: "Applications" },
    { className: "", title: "Date" },
    { className: "", title: "" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const debounceTerm = useDeboune(searchTerm, 2000);

  const query = {};
  if (debounceTerm) query["searchTerm"] = debounceTerm;

  const { data } = useMyJobsQuery({ ...query });
  const [updateJob] = useUpdateJobMutation();

  const dashboardJobsData = data?.data;

  const onCloseJob = catchAsync(async (id) => {
    const data = { status: ENUM_JOB_STATUS.CLOSED };
    await updateJob({ id, data });
    toast.success("Job Offer closed successfully");
  });

  const dataSource = dashboardJobsData?.map((data, i) => (
    <tr
      key={i}
      className="[&>*]:p-3 hover:bg-secondaryLight transition-colors border-b"
    >
      <td>
        <input type="checkbox" name="" id="" />
      </td>
      <td>
        <Link to={`/jobs/${data?.job?._id}`} className="main_row_title">
          {data?.job?.title}
        </Link>
        <div className="main_row_subtitle">
          <FaGlobeAsia /> {userFormatText(data?.job?.location) || "No Location"}
        </div>
      </td>
      <td className="font_var_medium">{userFormatText(data?.job?.industry)}</td>
      <td className="font_var_thin">
        {userFormatText(data?.job?.employmentType)}
      </td>
      <td className="font_var_thin_pri">
        {data?.applications?.length} candidates
      </td>
      <td>
        <DashboardBadge
          display={data?.job?.status || "Published"}
          bg="bg-green-700"
        />
        <div className="dashboard_table_date">
          {formatDate(data?.job?.createdAt, true)}
        </div>
      </td>
      <td>
        <div className="flex gap-2">
          <Link to={`edit-job/${data?.job?._id}`} className="btn_icon">
            <RiEdit2Fill />
          </Link>
          <Link to={`/jobs/${data?.job?._id}`} className="btn_icon">
            <FaEye />
          </Link>
          <button
            onClick={() => onCloseJob(data?.job?._id)}
            className="btn_icon"
          >
            <MdBlock />
          </button>
        </div>
      </td>
    </tr>
  ));

  return (
    <div>
      <DashboardHeader
        title="Manage Jobs"
        subtitle="Detailed list with all your job offers."
      />

      <TableSearchBar
        quantity={dashboardJobsData?.length}
        display="job"
        setSearchTerm={setSearchTerm}
      />

      <div className="mt-8">
        <EaseRecruitTable columns={columns} dataSource={dataSource} />
      </div>
    </div>
  );
}
