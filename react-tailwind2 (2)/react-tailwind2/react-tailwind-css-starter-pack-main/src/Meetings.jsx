import React, { useEffect, useRef, useState } from 'react';

const Meetings = ({ username = "user123" }) => {
  const jitsiContainerRef = useRef(null);
  const jitsiApiRef = useRef(null); // To track Jitsi API instance
  const [meetingLink, setMeetingLink] = useState('');

  useEffect(() => {
    const scriptId = 'jitsi-script';

    // If the script is already loaded, initialize Jitsi
    if (window.JitsiMeetExternalAPI) {
      initializeJitsi();
    } else if (!document.getElementById(scriptId)) {
      const script = document.createElement('script');
      script.src = 'https://meet.jit.si/external_api.js';
      script.async = true;
      script.id = scriptId;
      script.onload = initializeJitsi;
      document.body.appendChild(script);
    }

    // Clean up Jitsi instance on component unmount
    return () => {
      if (jitsiApiRef.current) {
        jitsiApiRef.current.dispose();
        jitsiApiRef.current = null;
      }
    };
  }, []);

  const initializeJitsi = () => {
    if (jitsiApiRef.current || !jitsiContainerRef.current) return;

    const domain = 'meet.jit.si';
    const roomName = `${username}_meeting_room`;
    const options = {
      roomName,
      width: '100%',
      height: 600,
      parentNode: jitsiContainerRef.current,
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK: false,
      },
      userInfo: {
        displayName: username,
      },
    };

    jitsiApiRef.current = new window.JitsiMeetExternalAPI(domain, options);

    const link = `https://${domain}/${roomName}`;
    setMeetingLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(meetingLink);
    alert('Meeting link copied!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Your Meeting Room</h2>

      {meetingLink && (
        <div className="mb-4">
          <p className="text-gray-700">Share this link:</p>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={meetingLink}
              readOnly
              className="border px-2 py-1 rounded w-full"
            />
            <button
              onClick={copyToClipboard}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Copy
            </button>
          </div>
        </div>
      )}

  <div ref={jitsiContainerRef} className="w-full rounded overflow-hidden" />
  </div>
    </div>
  );
};

export default Meetings;
