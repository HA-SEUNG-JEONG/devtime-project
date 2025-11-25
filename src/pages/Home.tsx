import NavBar from '@/components/common/NavBar';
import Timer from '@/components/common/Timer';
import TimerAction from '@/components/common/TimerAction';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <NavBar />
      <h1 className="mt-24 mb-[10px] text-7xl font-bold text-indigo">
        WELCOME
      </h1>
      <span className="text-14r mb-[50px] text-indigo">
        DevTime을 사용하려면 로그인이 필요합니다.
      </span>
      <div className="mb-20">
        <Timer />
      </div>
      <TimerAction state="ready" />
    </div>
  );
};

export default Home;
