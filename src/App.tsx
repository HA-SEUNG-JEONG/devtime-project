import { useState } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import Timer from "./component/Timer/Timer";
import TimerAction from "./components/Timer/TimerAction";

function App() {
  // TODO : 타이머 기능 추후 기능 예정
  // https://github.com/HA-SEUNG-JEONG/devTime-project/issues/31
  // https://github.com/HA-SEUNG-JEONG/devTime-project/issues/32
  // https://github.com/HA-SEUNG-JEONG/devTime-project/issues/33
  // https://github.com/HA-SEUNG-JEONG/devTime-project/issues/34
  // https://github.com/HA-SEUNG-JEONG/devTime-project/issues/35
  // https://github.com/HA-SEUNG-JEONG/devTime-project/issues/36
  // https://github.com/HA-SEUNG-JEONG/devTime-project/issues/37

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  return (
    <div className="flex min-h-screen flex-col px-4 py-4 sm:px-6 md:px-8 lg:px-12">
      <NavBar />
      <main className="flex flex-1 flex-col items-center justify-center gap-8 sm:gap-10 md:gap-12">
        <Timer hours={hours} minutes={minutes} seconds={seconds} />
        <TimerAction variant="ready" />
      </main>
    </div>
  );
}

export default App;
