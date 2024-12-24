import React, { useRef, useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { FaCircleUser } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";
import { RxHamburgerMenu } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
// import { SearchPlaces } from "../../Data/data";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
const Navbar = () => {
  const navigate = useNavigate();

  const handleView = (id) => {
    navigate(`/packages/${id}`);
    setSearchTerm("");
  };

  const [hoverSearch, setHoverSearch] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  console.log("searchTerm", setSearchResults);
  const refCurrent = useRef(null);
  // console.log(refCurrent.current);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (refCurrent.current && !refCurrent.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  // const [selectedOption, setSelectedOption] = useState("Travellers");
  // const [closeSelect, setCloseSelect] = useState(true);
  // const options = ["Travellers", "Tourists", "Guests"];
  // const [showCheckInCalendar, setShowCheckInCalendar] = useState(false);
  // const [showCheckOutCalendar, setShowCheckOutCalendar] = useState(false);
  // const [checkInDate, setCheckInDate] = useState(null);
  // const [checkOutDate, setCheckOutDate] = useState(null);
  const [modalShow, setModalShow] = React.useState(false);

  // Fetch destinations based on search term
  useEffect(() => {
    const fetchDestinations = async () => {
      if (searchTerm.length > 2) {
        // Only search if input length is greater than 2
        try {
          const response = await axios.get(
            "http://127.0.0.1:8000/api/destinations/",
            {
              params: { destination_name: searchTerm },
            }
          );

          const filteredResults = response.data.filter((destination) => {
            // Split the destination name and search term into words
            const destinationWords = destination.destination_name
              .toLowerCase()
              .split(" ")
              .slice(0, 3); // First 3 words of the destination
            const searchWords = searchTerm.toLowerCase().split(" ").slice(0, 3); // First 3 words of the search term

            // Check if the first 3 words of both match
            return destinationWords.join(" ").startsWith(searchWords.join(" "));
          });

          setSearchResults(filteredResults); // Set filtered results
        } catch (error) {
          console.error("Error fetching destinations:", error);
        }
      } else {
        setSearchResults([]); // Clear results if search term is too short
      }
    };

    fetchDestinations();
  }, [searchTerm]);

  return (
    <>
      {" "}
      <div className="flex justify-center w-full shadow-lg relative">
        <div
          className="flex w-full md:w-[80%] lg:w-[80%] items-center justify-between p-4"
          onMouseLeave={() => setHoverSearch(false)}
        >
          <span className="font-black text text-2xl">
            YAT<span className="text-[#F5B963]">RA</span>
          </span>
          <div className=" items-center gap-6 flex">
            <div className=" items-center gap-6 hidden  md:flex lg:flex">
              <>
                {" "}
                <Link to="/">HOME</Link>
                <Link to="/packages">PACKAGES</Link>
                <Link to="/aboutUs">ABOUT US</Link>
                <Link to="/contactus">CONTACT</Link>
              </>
            </div>
            <span className="flex items-center gap-6 relative">
              <CiSearch
                size={25}
                onMouseEnter={() => setHoverSearch(true)}
                className="cursor-pointer"
              />
              {hoverSearch && (
                <input
                  type="text"
                  className="absolute border right-[90px] p-[6px] w-[390px] rounded-md outline-none"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              )}
              <Link to="/login">
                <span className="w-[35px] h-[35px] rounded-full border border-black flex justify-center items-center">
                  {" "}
                  <FaCircleUser size={25} />
                </span>
              </Link>
            </span>
            <div className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
              <RxHamburgerMenu size={25} />
            </div>
          </div>
        </div>
        {menuOpen && (
          <div className=" absolute top-0 left-0 z-10 bg-[#00000044] h-full w-full">
            <div
              className="md:hidden bg-black text-white shadow-md w-[70%] h-full"
              ref={refCurrent}
            >
              <span
                className="p-2 flex justify-end cursor-pointer"
                onClick={() => setMenuOpen(false)}
              >
                {" "}
                <RxCross1 size={25} />
              </span>
              <div className="flex flex-col items-center py-4 space-y-4 ">
                <p>HOME</p>
                <p>PACKAGES</p>
                <p>ABOUT US</p>
                <Link to="/contactus">CONTACT</Link>
              </div>
            </div>
          </div>
        )}
      </div>{" "}
      {searchTerm && (
        <div className="absolute top-[15%] right-[20%] w-[60%] bg-red-500 border rounded-md mt-2 text-white z-1 h-fit">
          {searchResults.length > 0 ? (
            <ul>
              {searchResults.map((item, index) => (
                <li
                  key={index}
                  className="p-2 cursor-pointer hover:bg-red-400 "
                  onClick={() => handleView(item.id)}
                >
                  {item.destination_name}{" "}
                  {/* Assuming the API returns an object with a 'name' property */}
                </li>
              ))}
            </ul>
          ) : (
            <p className="p-2 bg-red-500 text-xl">No destinations found</p>
          )}
        </div>
      )}
    </>
  );
};

export default Navbar;

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
