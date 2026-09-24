"use client";
import { useEffect, useRef, useState } from "react";
import Leaf from "./Leaf";
export default function AgeGate() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [denied, setDenied] = useState(false);
  useEffect(() => {
    let accepted = false;
    try { accepted = sessionStorage.getItem("preston-age-confirmed") === "yes"; } catch { /* Browser storage can be disabled. */ }
    if (!accepted) dialog.current?.showModal();
  }, []);
  function accept() { try { sessionStorage.setItem("preston-age-confirmed", "yes"); } catch { /* Session only. */ } dialog.current?.close(); }
  return <dialog className="age-dialog" ref={dialog} aria-labelledby="age-title" onCancel={(event) => event.preventDefault()}><Leaf monogram /><p className="eyebrow">PRESTON CANNABIS · OTTAWA</p><h2 id="age-title">Welcome.<br/>Are you 19 or older?</h2><p>This website is intended for adults 19 years of age and older.</p>{denied ? <p role="alert">You must be 19 or older to enter this website.</p> : <div className="age-actions"><button className="button" onClick={accept}>Yes, I’m 19 or older</button><button className="text-button" onClick={() => setDenied(true)}>No, I’m under 19</button></div>}</dialog>;
}
