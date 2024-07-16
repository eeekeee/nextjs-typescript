import Logo from "./Logo";
import NavLink from "./NavLink";

function Header() {
  return (
    <div className="flex justify-between h-[100px] bg-white px-10 border-b-4">
      <Logo />
      <div className="flex w-[560px]">
        <NavLink href="/posts">Posts</NavLink>
        <NavLink href="/calendar">Calender</NavLink>
        <NavLink href="/others">Others</NavLink>
      </div>
      <div className="flex w-[160px]">
        <button className="mx-10 text-black text-4xl self-center">login</button>
      </div>
    </div>
  );
}

export default Header;
