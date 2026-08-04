import React from "react";

const TermsAndConditions = () => {
  const sections = [
    {
      title: "1. Services Offered",
      content: (
        <>
          <p className="mb-3 font-semi-bold">Cute & Glow provides:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Beauty parlour and makeup services for men and women.</li>
            <li>
              Artificial jewellery and related fashion accessories for sale.
            </li>
            <li>Online appointment booking and order management.</li>
          </ul>
        </>
      ),
    },

    {
      title: "2. User Eligibility",
      content:
        "You must be at least 18 years old or use the Platform under the supervision of a parent or legal guardian. You agree to provide accurate and complete information while registering or placing an order.",
    },

    {
      title: "3. Account Responsibility",
      content:
        "Users are responsible for maintaining the confidentiality of their login credentials and for all activities carried out through their accounts.",
    },

    {
      title: "4. Booking & Orders",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Service bookings are subject to confirmation and availability.
          </li>
          <li>
            Product orders are accepted only after successful payment or
            confirmation, as applicable.
          </li>
          <li>
            We reserve the right to refuse or cancel any booking or order due to
            pricing errors, suspected fraud, stock unavailability, or
            operational reasons.
          </li>
        </ul>
      ),
    },

    {
      title: "5. Pricing & Taxes",
      content:
        "All prices are displayed in Indian Rupees (INR) and may include or exclude GST as indicated. Prices are subject to change without prior notice.",
    },

    {
      title: "6. Cancellations & Refunds",
      content: (
        <ul className="list-disc pl-6 space-y-2">
          <li>
            Service cancellations must be made within the permitted cancellation
            period.
          </li>
          <li>
            Refunds, where applicable, will be processed to the original payment
            method.
          </li>
          <li>
            Artificial jewellery returns or exchanges are accepted only if the
            product is damaged, defective, or incorrect, subject to our Return
            Policy.
          </li>
        </ul>
      ),
    },

    {
      title: "7. User Responsibilities",
      content: (
        <>
          <p className="mb-3 font-semibold">Users shall not:</p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Misuse the Platform.</li>
            <li>Submit false or misleading information.</li>
            <li>Attempt unauthorized access.</li>
            <li>Upload unlawful, harmful, or infringing content.</li>
          </ul>
        </>
      ),
    },

    {
      title: "8. Intellectual Property",
      content:
        "All website content, including logos, designs, text, graphics, images, and software, is the property of Clear Craft Pvt. Ltd. or its licensors and may not be copied or reproduced without written permission.",
    },

    {
      title: "9. Limitation of Liability",
      content:
        "Cute & Glow shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of the Platform, except where such liability cannot be excluded under applicable law.",
    },

    {
      title: "10. Governing Law",
      content:
        "These Terms shall be governed by the laws of India. Any disputes shall be subject to the jurisdiction of the competent courts at the location of the registered office of Clear Craft Pvt. Ltd., unless otherwise required by law.",
    },
  ];

  return (
    <section className="bg-gray-100 min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-[#8B2954] rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <h1 className="text-3xl md:text-5xl font-bold">Terms & Conditions</h1>

          <p className="mt-4 text-white/90 leading-7 max-w-3xl">
            Welcome to <strong>Cute & Glow</strong> ("Platform", "Website",
            "we", "our", or "us"), owned and operated by{" "}
            <strong>Clear Craft Pvt. Ltd. </strong>
            By accessing or using <strong> https://cuteandglow.com</strong>, you
            agree to these Terms & Conditions.
          </p>

          <div className="mt-6 inline-flex items-center bg-white text-[#8B2954] rounded-full px-5 py-2 font-semibold">
            Effective Date : 03-08-2026
          </div>
        </div>

        {/* Sections */}
        <div className="mt-10 space-y-6">
          {sections.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl duration-300 border-l-[6px] border-[#8B2954] p-6 md:p-8"
            >
              <h2 className="text-xl md:text-2xl font-bold text-[#8B2954] mb-5">
                {item.title}
              </h2>

              <div className="text-gray-700 leading-8 text-[15px] md:text-base">
                {item.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        {/* <div className="mt-12 bg-[#8B2954] rounded-2xl p-6 text-center text-white">
          <h3 className="text-xl font-semibold">
            Thank You for Choosing Cute & Glow
          </h3>

          <p className="mt-3 text-white/90 max-w-3xl mx-auto leading-7">
            We appreciate your trust in our platform. By continuing to use our
            services, you acknowledge that you have read, understood, and agree
            to these Terms & Conditions.
          </p>
        </div> */}
      </div>
    </section>
  );
};

export default TermsAndConditions;
