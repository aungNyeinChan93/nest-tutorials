import React from "react";

const fetchGoogleLogin = async () => {
  const response = await fetch("http://localhost:3000/auth/google/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data;
};

const GoogleLoginPage = async () => {
  const data = await fetchGoogleLogin();

  return (
    <React.Fragment>
      <main className=" w-full min-h-screen flex justify-center items-center">
        <button type="button" className=" px-4 py-2 rounded-2xl bg-red-500">
          GoogleLoginPage
        </button>

        {JSON.stringify(data, null, 2)}
      </main>
    </React.Fragment>
  );
};

export default GoogleLoginPage;
