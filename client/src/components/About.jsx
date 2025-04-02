const About = () => {
    return (
      <div className="bg-white text-black px-6 py-12 max-w-4xl mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6">About UniKart</h2>
        <p className="text-lg leading-relaxed">
          UniKart is designed for **college students** to <span className="text-[#FF9D23] font-medium">buy smart</span> and <span className="text-[#F93827] font-medium">sell easy</span>. Many students have items they no longer need or simply want to make extra cash—UniKart makes it effortless.
        </p>
  
        <h3 className="text-2xl font-semibold mt-8 mb-4">🔑 Secure & Verified</h3>
        <p className="text-lg">
          Users must log in with their **official college email ID**, where they receive a **verification code** to sign in. Passwords are securely stored **after hashing**, ensuring that even we cannot access them.
        </p>
  
        <h3 className="text-2xl font-semibold mt-8 mb-4">🙈 Stay Anonymous</h3>
        <p className="text-lg">
          If anonymity is enabled, your **contact, first name, and last name** will not be stored. You can choose any **unique username** to use the platform privately.
        </p>
  
        <h3 className="text-2xl font-semibold mt-8 mb-4">🛍 Create & Manage Listings</h3>
        <p className="text-lg">
          Users can **create listings** by uploading an **image, name, description, and price**. The description should specify whether it's a single item or has multiple units. Listings can be **edited** anytime and are accessible in the **My Listings** tab.
        </p>
  
        <h3 className="text-2xl font-semibold mt-8 mb-4">💬 Buy & Contact Sellers</h3>
        <p className="text-lg">
          When buying, users have two options:  
          - **Contact Seller:** View the seller’s contact details (if enabled).  
          - **Direct Message:** Send a message within UniKart.
        </p>
  
        <h3 className="text-2xl font-semibold mt-8 mb-4">💼 The Gig Section</h3>
        <p className="text-lg">
          Apart from buying and selling, students can **post or browse gigs**—whether it's for **offering services, requesting help, tutoring, or anything else**.
        </p>
  
        <p className="text-center text-lg mt-8 font-medium">
          UniKart is built to **empower students** with a seamless and secure marketplace. 🚀
        </p>
      </div>
    );
  };
  
  export default About;
  