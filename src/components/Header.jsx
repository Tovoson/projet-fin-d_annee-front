const Header = ({titre}) => {
  return (
    <div className="w-full h-18 shadow-md ">
      <div className="flex items-center justify-center h-full w-full">
        <h2 className="font-bold">{titre}</h2>
      </div>
    </div>
  );
};

export default Header;
