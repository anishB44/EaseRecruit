import PageHeader from "@/components/ui/PageHeader";
import { IoMailUnread } from "react-icons/io5";
import { FaPhoneAlt } from "react-icons/fa";
// import { HiMiniBuildingOffice2 } from "react-icons/hi2";
import { HiBuildingOffice2 } from "react-icons/hi2";
import SectionHeader from "@/components/ui/SectionHeader";

export default function ContactPage() {
  return (
    <div className=" mt-20">
      <PageHeader
        title="Contact"
        subtitle="Let us know your concern"
        className="bg-secondaryLight"
      />
      <div className="pt-20">
        <SectionHeader title="Contact with Us" subtitle=" Get in Touch" />
        <div className="max_container flex mt-8 gap-8 flex-wrap justify-center ">
          <div className="border flex flex-col items-center gap-2 shadow-md p-10 rounded-xl">
            <IoMailUnread className="text-4xl mb-6 text-green-500" />
            <h2 className="text-2xl font-semibold mb-1">Email Address</h2>
            <div className="text-grayColor">
              <p className="mb-1">easerecruit@gmail.com</p>
              <p>developers101@gmail.com</p>
            </div>
          </div>
          <div className="border flex flex-col items-center gap-2 shadow-md p-10 rounded-xl">
            <FaPhoneAlt className="text-4xl mb-6 text-orange-500" />
            <h2 className="text-2xl font-semibold mb-1">Phone Number</h2>
            <div className="text-grayColor">
              <p className="mb-1">(+91) 8939691813</p>
              <p>+2(305) 587-3407</p>
            </div>
          </div>
          <div className="border flex flex-col items-center gap-2 shadow-md p-10 rounded-xl">
            <HiBuildingOffice2 className="text-4xl mb-6 text-blue-500" />
            <h2 className="text-2xl font-semibold mb-1">Office Address </h2>
            <div className="text-grayColor">
              <p className="mb-1">Jeppiaar nagar, semancheri</p>
              <p>chennai, TN 600064</p>
            </div>
          </div>
        </div>

        <div className=" bg-secondaryLight py-20 mt-20">
          <div className="max_container flex flex-col lg:flex-row gap-6">
            <div className="bg-[#FFFAF4] lg:w-1/2 rounded-lg grid place-items-center p-10">
              <h1 className="mb-10 font-medium text-2xl">Sent Us Mail</h1>
              <form>
                <div className="space-y-4">
                  <div className="flex flex-col items-start ">
                    <label htmlFor="email" className="ml-5 mb-1">
                      Email
                    </label>
                    <input placeholder="Your Email" type="email" id="email" />
                  </div>
                  <div className="flex flex-col items-start">
                    <label htmlFor="subject" className="ml-5 mb-1">
                      Subject
                    </label>
                    <input
                      placeholder="Your Subject"
                      type="email"
                      id="subject"
                    />
                  </div>
                  <div className="flex flex-col items-start">
                    <label htmlFor="password" className="ml-5 mb-1">
                      Message
                    </label>
                    <textarea
                      placeholder="Your message..."
                      rows={5}
                      className="resize-none"
                    />
                  </div>
                  <div className="relative !mt-8">
                    <button
                      type="submit"
                      className="font-bold text-white py-3 rounded-full bg-primary w-full"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="lg:w-1/2">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.6438508868555!2d80.21791737461639!3d12.866264617179816!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a525bbace477413%3A0xf70e4decbbd645ea!2sJeppiaar%20Engineering%20College!5e0!3m2!1sen!2sin!4v1727207860336!5m2!1sen!2sin"
                title="google-map"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full min-h-[400px] rounded-xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
