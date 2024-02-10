export default function UpDown() {
  return (
    <div className="flex flex-row justify-around">
      <div className="m-5 w-72 h-72 bg-green-500 hover:opacity-80 flex justify-center items-center border-black border-4">
        Up
      </div>
      <div className="m-5 w-72 h-72 bg-red-500 hover:opacity-80 flex justify-center items-center border-black border-4">
        Down
      </div>
    </div>
  );
}
