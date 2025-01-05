"use client";

import Link from "next/link";
import AppContext from "../components/app-context";
import { kodchasan } from "../components/font-loader";
import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";

import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../lib/firebase/config";
import { useRouter } from 'next/navigation'


export default function LayoutClient({ children }) {
  let [showPopup, setShowPopup] = useState(false);
  let [user, setUser] = useState(undefined);
  const router = useRouter()

  function logout() {
    signOut(auth);
  }

  useEffect(() => {
    onAuthStateChanged(auth, function (user) {
      if (user) {
        setUser(user)
        router.push("/")
      }
      else {
        setUser(null);
      }

    })
  }, [])


  return (
    <AppContext.Provider value={{ user, setUser }}>
      <div onClick={() => setShowPopup(false)}>
        <nav
          className={`flex space-x-3 p-2 blueBorder text-xl grayText items-center ${kodchasan.className}`}
          style={{ borderBottomWidth: "6px" }}
        >
          <Link href="/">
            <img
              src="https://i.imgur.com/bUyADUT.png"
              className="h-10 select-none"
            />
          </Link>
          <div className="flex-1"></div>
          {user ? (
            <button className="btn" onClick={logout}>
              Log Out{" "}
            </button>
          ) : (
            <>
              <Link href="/signup">
                <button className="btn">Sign Up </button>
              </Link>
              <Link href="/login">
                <button className="btn">Log In </button>
              </Link>{" "}
            </>
          )}
          <div
            onClick={(event) => {
              event.stopPropagation();
              setShowPopup((v) => !v);
            }}
            className="select-none text-3xl grayText pr-4"
          >
            <GiHamburgerMenu />
          </div>
          {showPopup ? (
            <div className="absolute border-2 grayBorder right-3 top-14 grayBody flex flex-col items-center text-center rounded-md select-none z-40">
              <Child link="/" name="Home" />
              <Child link="/about" name="About Us" />
              <Child link="/calendars" name="Calendar-student" />
              <Child link="/calendart" name="Calendar-teacher" />
              <Child link="/idk" name="login" />
            </div>
          ) : undefined}
        </nav>
        <main>{children}</main>
      </div>
    </AppContext.Provider>
  );
}

function Child({ link, name }) {
  return (
    <Link
      href={link}
      className="border border-2 grayBorder p-2 w-32 hover:darkGrayBody"
    >
      {name}
    </Link>
  );
}
