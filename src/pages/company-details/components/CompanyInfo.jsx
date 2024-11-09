import React from 'react';
import JobCard from "../../job-listing/components/JobCard";

export default function CompanyInfo({ companyInfo, availableJobs, images, videoUrl }) {
  const firstName = companyInfo?.name?.split(" ")[0];

  return (
    <div className="mt-8">
      {/* +++ About +++ */}
      <div>
        <h1 className="text-4xl font-bold leading-10 tracking-tight mb-5">
          About {firstName}
        </h1>
        <p className="text_accent">{companyInfo?.about}</p>
      </div>

      {/* +++ Gallery +++ */}
      <div className="my-4">
        <div className="grid grid-cols-12 gap-2">
          {images?.map((image, index) => (
            <figure className="img_container" key={index}>
              <img className={`img_class ${index === 2 || index === 3 ? 'h-[580px]' : 'h-[300px]'}`} src={image} alt={`Company Image ${index + 1}`} />
            </figure>
          ))}
        </div>
      </div>

      {/* <p className="text_accent">
        Artistre Studio, Inc. is an American multinational corporation that is
        engaged in the design, development, manufacturing, and worldwide
        marketing and sales of footwear, apparel, equipment, accessories, and
        services.
      </p> */}

      {/* +++ Video & Info +++ */}
      <div className="mt-7 flex gap-6 flex-col md:flex-row">
        <div className="flex-1">
          <div className="iframe_container">
            <iframe
              className="rounded-2xl responsive_iframe"
              src={videoUrl}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
        {/* <div className="flex-1">
          <p className="text_accent">
            In 2020 the brand alone was valued in excess of $32 billion, making
            it the most valuable brand among sports businesses. Previously, in
            2017, the Artistre Studio brand was valued at $29.6 billion.
            Artistre Studio ranked 89th in the 2018 Fortune 500 list of the
            largest United States corporations by total revenue. There are many
            variations of passages of Lorem Ipsum available, but the majority
            have suffered alteration in some form, by injected humour, or
            randomised words which don’t look even slightly believable.
          </p>
        </div> */}
      </div>

      {/* +++ Available Jobs +++ */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold leading-8 tracking-tight">
          Available Jobs
        </h2>
        <p className="text-base font-light leading-6 mt-2 opacity-[0.7]">
          Jobs posted by {companyInfo?.name}
        </p>
        <div className="grid grid-cols-12 gap-5 mt-8">
          {availableJobs?.map((job, i) => (
            <div key={i} className="col-span-12 md:col-span-6 xl:col-span-4">
              <JobCard jobInfo={job} company={companyInfo} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
