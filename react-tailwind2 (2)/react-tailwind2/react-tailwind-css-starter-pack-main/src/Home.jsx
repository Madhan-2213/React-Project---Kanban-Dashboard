import React from 'react';
import {useNavigate } from 'react-router-dom';
import './App.css';
import image from './assest/image.png'; // Ensure the image file exists
import card1 from './assest/card1.png';
import card2 from './assest/card2.png';
import card3 from './assest/card3.png'; // Ensure the image file exists
import page3 from './assest/page3.png'; // Ensure the image file exists

function Home() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  const handleGetStartedClick = () => {
    navigate("/signup");
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-white">
      <header className="w-full bg-gray-100 p-9 flex justify-between items-center">
        <h1 className="text-3xl font-normal " style={{ color: "#2D8C75" }}>Zidio Task Management</h1>
        <div className="flex gap-6">
          <button onClick={handleLoginClick} className="bg-white text-green-800 border border-green-800 px-6 py-3 rounded-full font-medium">Login</button>
          <button onClick={handleSignupClick} className="bg-green-800 text-white px-5 py-2 rounded-full font-medium"style={{ backgroundColor: "#2D8C75" }}>Sign up</button>
        </div>
      </header>
      <section className="w-full flex flex-row items-start text-left mt-10 px-6">
        <div className="w-1/2 flex flex-col">
          <h2 className="text-4xl font-bold mb-5 mt-13 mr-60 pt-16 pl-5 ">Transform Task Management with Zidio</h2>
          <p className="text-lg mb-6 text-left pl-5 mr-60 ">
            Harness Zidio Task Management to enhance efficiency and collaboration. Our intuitive platform allows for effortless task organization, real-time progress tracking, and seamless teamwork, enabling your team to focus on achieving goals.
          </p>
          <div>
            <button
              onClick={handleGetStartedClick}
              className="mt-2 px-5 py-3 ml-6 rounded-full bg-green-500 text-white text-sm font-medium tracking-wider shadow-lg hover:shadow-md active:shadow-none active:translate-y-1 transition-all duration-200"
            >
              Get Started
            </button>
          </div>
        </div>
        <div className="w-1/2 ">
          <img src={image} alt="Task Management Illustration" className="mr-32 mt-0 w-full h-auto object-cover" />
        </div>     
      </section>
      <section className="w-full flex flex-col items-center text-center mt-20 px-6">
        <h2 className="px-60 mx-5 text-5xl text-center font-bold mt-14 mb-10">Experience the transformative capabilities of Zidio Task Management</h2>
        <div className="flex flex-row justify-center gap-10 mt-6 px-10">
          <div className="w-1/3 p-6 border rounded-lg">
            <img src={card1} alt="Kanban Boards" className="w-full h-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Robust Task Organization with Kanban Boards</h3>
            <p className="text-base">Visualize your workflows and prioritize tasks effectively, ensuring your team is always aligned.</p>
          </div>
          <div className="w-1/3 p-6 border rounded-lg">
            <img src={card2} alt="Progress Tracking" className="w-full h-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 mt-10">Real-Time Progress Tracking</h3>
            <p className="text-base mt-10">Stay up-to-date with your projects and make swift adjustments to keep everything on course.</p>
          </div>
          <div className="w-1/3 p-6 border rounded-lg">
            <img src={card3} alt="Seamless Integrations" className="w-full h-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 mt-5">Seamless Integrations</h3>
            <p className="text-base mt-7">Integrate with the tools you already use, simplifying your workflow and reducing app-switching.</p>
          </div>
        </div>
      </section>
      <section className="w-full flex flex-row items-start text-left mt-20 px-7">
        <div className="w-1/2 flex flex-col mt-20">
          <h2 className="text-5xl font-bold mb-7">Empower Your Team with Zidio Task Management</h2>
          <p className="text-lg mb-7">
            Our platform enhances efficiency and collaboration, allowing you to take control of your projects effortlessly.
          </p>
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">1</div>
              <div>
                <h3 className="text-xl font-semibold">Dynamic Kanban Boards</h3>
                <p className="text-base">Visualize your workflow and prioritize tasks with clarity, enhancing accountability among team members.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">2</div>
              <div>
                <h3 className="text-xl font-semibold">Real-Time Updates</h3>
                <p className="text-base">Stay informed as projects evolve, ensuring your team remains synchronized and adaptable.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="bg-green-500 text-white rounded-full w-8 h-8 flex items-center justify-center">3</div>
              <div>
                <h3 className="text-xl font-semibold">Seamless Integrations</h3>
                <p className="text-base">Integrate with existing tools to streamline processes and maintain productivity without interruption.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-1/2">
          <img src={page3} alt="Empower Your Team" className="w-full h-auto" />
        </div>
      </section>
  {/* Tutorial video section removed as per request */}
      <section className="w-full flex flex-row items-start text-left mt-20 px-7">
        <div className="w-1/2 flex flex-col mt-20 px-10  ">
          <h2 className="text-4xl font-bold mb-5">Unlock your team's full potential with Zidio Tool Management</h2>
          <p className="text-xl italic text-gray-600 mb-10">Experience a cutting-edge platform that streamlines task organization and enhances collaboration</p>
          <form className="flex flex-col gap-4">
            <input type="text" placeholder="Your Name*" className="border p-3 rounded-md mr-20" />
            <input type="email" placeholder="Your Email Address*" className="border p-3 rounded-md mr-20" />
            <textarea placeholder="Share your message or question*" className="border p-3 rounded-md mr-20 h-32"></textarea>
            <div>
            <button
              className="mt-2 px-5 py-3 ml-6 rounded-full bg-green-500 text-white text-sm font-medium tracking-wider shadow-lg hover:shadow-md active:shadow-none active:translate-y-1 transition-all duration-200"
            >
              Get Started
            </button>
            </div>
          </form>
        </div>
        <div className="w-1/2 flex flex-col mt-20 pt-10 pl-10">
          <h3 className="text-2xl font-bold mb-5">Frequently Asked Questions</h3>
          <div className="border-t border-b divide-y">
            <details className="py-4">
              <summary className="cursor-pointer text-lg font-medium">How can Zidio support my team's productivity?</summary>
              <p className="mt-2 text-base">Zidio provides tools for task organization, real-time progress tracking, and seamless collaboration, enhancing overall productivity.</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer text-lg font-medium">What features make Zidio unique?</summary>
              <p className="mt-2 text-base">Zidio offers dynamic Kanban boards, real-time updates, and seamless integrations with existing tools.</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer text-lg font-medium">How does Zidio drive teamwork?</summary>
              <p className="mt-2 text-base">Zidio enhances teamwork by providing a platform for clear task delegation, progress tracking, and effective communication.</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer text-lg font-medium">What support options do you offer?</summary>
              <p className="mt-2 text-base">We offer 24/7 customer support, comprehensive documentation, and community forums to assist you.</p>
            </details>
            <details className="py-4">
              <summary className="cursor-pointer text-lg font-medium">How can I get started with Zidio?</summary>
              <p className="mt-2 text-base">Sign up for a free trial on our website and explore the features of Zidio Task Management.</p>
            </details>
          </div>
        </div>
      </section>
      <footer className="w-full bg-gray-100 py-10 mt-20 rounded-3xl">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-1/4 mb-6 md:mb-0">
              <h3 className="text-2xl font-bold mb-4">Zidio Tool Management</h3>
              <p className="text-gray-600">
                Zidio Task Management showcases our commitment to innovation and efficiency, offering a user-friendly platform for task organization, progress tracking, and team collaboration. With features like Kanban boards, real-time updates, and seamless integrations, it streamlines workflows and enhances productivity.
              </p>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0 pl-20">
              <h3 className="text-2xl font-bold mb-4">Our Services</h3>
              <ul className="text-gray-600">
                <li className="mb-2">Features</li>
                <li className="mb-2">Pricing</li>
                <li className="mb-2">Help Center</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 mb-6 md:mb-0 pl-14">
              <h3 className="text-2xl font-bold mb-4">About Us</h3>
              <ul className="text-gray-600">
                <li className="mb-2">What We Stand For</li>
                <li className="mb-2">Blog</li>
              </ul>
            </div>
            <div className="w-full md:w-1/4 pl-10">
              <h3 className="text-2xl font-bold mb-4">Contact Information</h3>
              <p className="text-gray-600 mb-2">123 Zidio Ave, Suite 456, Management City, NC 28201</p>
              <p className="text-gray-600 mb-2"><i className="fas fa-phone-alt"></i> +1 (888) 123-4567</p>
              <p className="text-gray-600"><i className="fas fa-envelope"></i> info@zidiotoolmanagement.com</p>
            </div>
          </div>
          <hr className="my-2 " />
          <div className="text-center text-gray-600 mt-14 pt-8">
            © 2025 Zidio Tool Management All Rights Reserved
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Home;
