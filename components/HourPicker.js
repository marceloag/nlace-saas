function HourPicker({ hora_publicacion }) {
  return (
    <div className="bg-white rounded-md px-2 border-solid border-gray-200 border-[1px] text-xs">
      <input
        type="time"
        value={hora_publicacion}
        className="w-full h-9 rounded-lg text-gray-600  focus:outline-none"
      />
    </div>
  );
}

export default HourPicker;
