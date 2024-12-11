import React, { useState } from "react";
import { IoCalendarOutline } from "react-icons/io5";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { HiMiniUsers } from "react-icons/hi2";

const HomeSearchPlaces = () => {
  const [selectedOption, setSelectedOption] = useState("Travellers");
  const [closeSelect, setCloseSelect] = useState(true);
  const options = ["Travellers", "Tourists", "Guests"];
  const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);

  const toggleSelectVisibility = () => {
    setCloseSelect((prev) => !prev);
  };

  const handleClickSelect = (option) => {
    setSelectedOption(option);
    setCloseSelect(true);
  };
  const handleCheckInChange = (date) => {
    setCheckInDate(date);

    // Automatically close the Check In calendar after selecting a date
    setShowCheckInCalendar(false);
  };

  const handleCheckOutChange = (date) => {
    setCheckOutDate(date);

    // Automatically close the Check Out calendar after selecting a date
    setShowCheckOutCalendar(false);
  };
  return (
    <>
      <div className="w-full flex justify-center h-auto md:h-[100px] md:absolute bottom-0 md:-bottom-2 p-2">
        <div className="w-full lg:w-[70%] flex flex-row md:flex-row items-center justify-center bg-white shadow-2xl rounded-md p-4 gap-4 relative">
          <div className="w-full flex flex-col md:flex-row gap-4 items-center ">
            <span onClick={() => setModalShow(true)}>
              <input
                type="search"
                placeholder="Visit new places"
                className="border p-2 w-full md:w-auto bg-[#EAEAEA] outline-none text-sm"
              />
            </span>
            <span
              className="flex p-1 bg-[#EAEAEA] w-full md:w-[150px] h-[40px] text-gray-700 text-sm rounded-md gap-x-2 items-center justify-center cursor-pointer"
              onClick={() => setShowCheckInCalendar((prev) => !prev)}
            >
              <IoCalendarOutline />
              <button>
                {checkInDate ? checkInDate.toLocaleDateString() : "Check In"}{" "}
              </button>
            </span>
            <span
              className="flex p-1 bg-[#EAEAEA] w-full md:w-[150px] h-[40px] text-gray-700 text-sm rounded-md gap-x-2 items-center justify-center"
              onClick={() => setShowCheckOutCalendar((prev) => !prev)}
            >
              <IoCalendarOutline />
              <button>
                {checkOutDate ? checkOutDate.toLocaleDateString() : "Check Out"}{" "}
              </button>
            </span>
            <span
              className="flex p-1 bg-[#EAEAEA] w-full md:w-[150px] h-[40px] text-gray-700 text-sm rounded-md gap-x-2 items-center justify-center cursor-pointer relative"
              onClick={toggleSelectVisibility}
            >
              <HiMiniUsers /> <button>{selectedOption}</button>
            </span>
            {!closeSelect && (
              <div className="absolute top-full mt-3 bg-white border border-gray-300 rounded shadow-lg w-[300px] right-[15%]">
                {options.map((option) => (
                  <div
                    key={option}
                    className="p-2 hover:bg-gray-200 cursor-pointer"
                    onClick={() => handleClickSelect(option)}
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      {showCheckInCalendar && (
        <Calendar
          onChange={handleCheckInChange}
          value={checkInDate || new Date()}
          className="absolute top-[100%] left-[30%]"
        />
      )}

      {showCheckOutCalendar && (
        <Calendar
          onChange={handleCheckOutChange}
          value={checkOutDate || new Date()}
          className="absolute top-[100%] left-[50%]"
        />
      )}
      {/* <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      /> */}
    </>
  );
};

export default HomeSearchPlaces;

// function MyVerticallyCenteredModal(props) {
//   return (
//     <Modal
//       {...props}
//       size="lg"
//       aria-labelledby="contained-modal-title-vcenter"
//       centered
//     >
//       {" "}
//       <div className="flex p-4 w-full text-lg bottom-b border-slate-400">
//         <h5>Visit New Places</h5>{" "}
//       </div>{" "}
//       <div className="grid grid-cols-4 justify-between p-4 w-full text-sm flex-nowrap">
//         {SearchPlaces?.map((item, index) => {
//           return (
//             <>
//               {" "}
//               <span className="col-span-1" key={item.id}>
//                 <img
//                   src={item.image}
//                   alt=""
//                   className="w-[150px] h-[150px] rounded-md"
//                 />
//                 <h5 className="text-base flex justify-center">
//                   {item.location}
//                 </h5>{" "}
//               </span>
//             </>
//           );
//         })}
//       </div>
//       <Modal.Footer>
//         <Button onClick={props.onHide}>Close</Button>
//       </Modal.Footer>
//     </Modal>
//   );
// }
