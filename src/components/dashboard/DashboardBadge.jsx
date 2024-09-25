import { ENUM_APPLICATION_STATUS } from "@/enums/applicationStatus";
import { capitalizeFirstLetter } from "@/utils/capitalizeLetter";
import { ENUM_JOB_STATUS } from "@/enums/jobOffer";

export default function DashboardBadge({ display, bg, type, classes }) {
  if (display === ENUM_APPLICATION_STATUS.ACCEPTED) bg = "bg-green-700";
  if (display === ENUM_APPLICATION_STATUS.REJECTED) bg = "bg-red-700";
  if (display === ENUM_APPLICATION_STATUS.PENDING) bg = "bg-sky-700";

  if (display === ENUM_JOB_STATUS.PUBLISHED) bg = "bg-green-700";
  if (display === ENUM_JOB_STATUS.CLOSED) bg = "bg-red-700";

  return (
    <div
      className={`text-xs inline-block px-2 py-[1px] mb-1 text-white rounded-full font-medium ${bg} ${classes}`}
    >
      {capitalizeFirstLetter(display)}
    </div>
  );
}
