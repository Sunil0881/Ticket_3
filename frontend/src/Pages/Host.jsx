
import React, { useState } from "react";
import { HOSTEVENT } from "../ContractIntegration";

const Host = () => {
  const [host, setHost] = useState({
    name: '',
    location: '',
    totaltickets: '',
    price: '',
    date: '',
    time: '',
  });

  const [transactionStatus, setTransactionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHost((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addHost = async () => {
    try {
      const { name, location, totaltickets, price, date, time } = host;
      const tokenId = await HOSTEVENT({ name, location, totaltickets, price, date, time });
      console.log("Transaction Hash:", tokenId);
      setTransactionStatus("Successfully submitted!");
    } catch (error) {
      console.error("Error hosting event:", error);
      setTransactionStatus("Transaction failed. Please try again.");
    }
  };

  return (
    <div className="play bg-gray-800 h-screen flex flex-col px-60 py-11">
      <input type="text" className="w-full my-3" placeholder="event name" name="name" value={host.name} onChange={handleChange} />
      <input type="text" className="w-full my-3" placeholder="location" name="location" value={host.location} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="total tickets" name="totaltickets" value={host.totaltickets} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="price" name="price" value={host.price} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="date" name="date" value={host.date} onChange={handleChange} />
      <input type="number" className="w-full my-3" placeholder="time" name="time" value={host.time} onChange={handleChange} />
      <button className="bg-red-500" onClick={addHost}>Host</button>
      {transactionStatus && (
        <div className={transactionStatus === "Successfully submitted!" ? "text-green-500" : "text-red-500"}>
          {transactionStatus}
        </div>
      )}

import React from "react";
import config from "../Contract/ticket.json";
import  { useState } from "react";
import Web3 from 'web3';
import Navbar from "../Components/Navbar";

const Host = () => {

    const [web3, setWeb3] = useState(null);
    const [emptyFields, setEmptyFields] = useState([]);

    const [Description, setDescription] = useState("");
    const [Eventname, setEventname] = useState("");
    const [Date, setDate] = useState("");
    const [Time, setTime] = useState("");
    const [Venue, setVenue] = useState("");
    const [Capacity, setCapacity] = useState("");
    const [error, setError] = useState(null);
  
    const initializeWeb3 = async () => {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
  
        try {
          await window.ethereum.enable();
        } catch (error) {
          console.error(error);
        }
      } else if (window.web3) {
        const web3Instance = new Web3(window.web3.currentProvider);
        setWeb3(web3Instance);
      } else {
        console.log("Non-Ethereum browser detected. You should consider trying MetaMask!");
      }
    };
  
    const hostEvent = async (e) => {
      e.preventDefault();
      const accounts = await web3.eth.getAccounts();
  
      try {
        const contract = new web3.eth.Contract(config.abi);
        await contract.methods
          .hostEvent(Eventname, Venue, Capacity, 10, Date, Time)
          .send({ from: accounts[0] });
  
        alert('Event hosted successfully!');
      } catch (error) {
        console.error(error);
        setError('Error hosting event');
      }
    };
 
    return ( 
      <div className=" play bg-gray-600 h-screen">
        <Navbar />
        <form class="   pb-10 mt-20 l-20"  >
        <div class=" pl-44">
       
        <div class="relative z-0 w-9/12 mb-6 group">
            <input type="text" name="description" onChange={(e) => setDescription(e.target.value)}
            value={Description}
            className={emptyFields.includes('Description') ? 'error' : ''} id="description" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Description"  />
            <label for="description" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6" data-aos="fade-right"></label>
        </div> <div class="relative z-0 w-9/12 mb-6 group">
            <input type="text" onChange={(e) => setEventname(e.target.value)}
            value={Eventname}
            className={emptyFields.includes('Eventname') ? 'error' : ''}  name="EventName" id="EventName" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Event Name" required />
            <label for="EventName" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6" data-aos="fade-right"></label>
        </div>
        <div className="flex gap-28 ">
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="date" onChange={(e) => setDate(e.target.value)}
            value={Date}
            className={emptyFields.includes('Date') ? 'error' : ''} name="date" id="date" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Date " required />
            <label for="date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">From</label>
        </div>
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="date" onChange={(e) => setDate(e.target.value)}
            value={Date}
            className={emptyFields.includes('Date') ? 'error' : ''} name="date" id="date" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Date "  />
            <label for="date" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">To</label>
        </div>
        </div>
        <div className="flex gap-28 ">
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="time" onChange={(e) => setTime(e.target.value)}    
            value={Time}
            className={emptyFields.includes('Time') ? 'error' : ''} name="time" id="time" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Time" required />
            <label for="time" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">Start</label>
        </div>
        <div class="relative z-0 w-1/3 mb-6 group">
            <input type="time" onChange={(e) => setTime(e.target.value)}    
            value={Time}
            className={emptyFields.includes('Time') ? 'error' : ''} name="time" id="time" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Time"  />
            <label for="time" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6">End</label>
        </div>
        </div>
        </div>
      
        <div class=" pl-44">
        <div class="relative z-0 w-9/12 mb-6 group">
            <input type="text" onChange={(e) => setVenue(e.target.value)}
            value={Venue}
            className={emptyFields.includes('Venue') ? 'error' : ''} name="Venue" id="Venue" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder="Venue " required />
            <label for="Venue" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-6" data-aos="fade-right"></label>
        </div>
        <div class="relative z-0 w-9/12 mb-6 group">
            <input type="number" onChange={(e) => setCapacity(e.target.value)}
            value={Capacity}
            className={emptyFields.includes('Capacity') ? 'error' : ''} name="Capacity" id="Capacity" class="block py-2.5 px-0 w-full text-sm text-white bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-black dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer placeholder-white" placeholder=" Capacity" required />
            <label for="Capacity" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 pl-5" data-aos="fade-right"></label>
        </div>
        
        </div>
        <div class=" pl-44 ">
            <button type="submit" class="text-black font-semibold  bg-yellow-400 hover:scale-105 focus:ring-4 focus:outline-none focus:ring-blue-300 font-md rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-yellow-300 hover:scale-105 dark:focus:ring-black" onSubmit={hostEvent}>Host</button>
        </div>
      </form>
      {error}

    </div>
  );
};

export default Host;
