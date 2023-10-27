import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "../AddMember.css";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useAPI } from "../../../Context";
import { useEffect } from "react";
import axios from "axios";

const EditEmployeeModal = ({ open, onClose, selectedEmployee }) => {
  const [newEmployee, setNewEmployee] = useState({
    // id: Date.now(),
    Emp_ID:'',
    Emp_name: "",
    email: "",
    Emp_contact_No: "",
    Emp_department: "",
    Emp_city: "",
    Emp_state: "",
    Emp_DOB: "",
    Emp_joining_date: "",
    Emp_blood_group:"",
    Emp_qualification:"",
    Emp_expertise:"",

  });
  // console.log(`selectedEmployee ${selectedEmployee}`);
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      [name]: value,
    }));
  };

  const [selectedState, setSelectedState] = useState("");
  const [selectedcity, setSelectedcity] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);

  const statesData = {
    AndraPradesh: [
      "Anantapur",
      "Chittoor",
      "East Godai",
      "Guntur",
      "Kadapa",
      "Krishna",
      "Kurnool",
      "Prakasam",
      "Nellore",
      "Srikakulam",
      "Visakhapatnam",
      "Vizianagaram",
      "West Godai",
    ],
    ArunachalPradesh: [
      "Anjaw",
      "Changlang",
      "Dibang Valley",
      "East Kameng",
      "East Siang",
      "Kra Daadi",
      "Kurung Kumey",
      "Lohit",
      "Longding",
      "Lower Dibang Valley",
      "Lower Subansiri",
      "Namsai",
      "Papum Pare",
      "Siang",
      "Tawang",
      "Tirap",
      "Upper Siang",
      "Upper Subansiri",
      "West Kameng",
      "West Siang",
      "Itanagar",
    ],
    Assam: [
      "Baksa",
      "Barpeta",
      "Biswanath",
      "Bongaigaon",
      "Cachar",
      "Charaideo",
      "Chirang",
      "Darrang",
      "Dhemaji",
      "Dhubri",
      "Dibrugarh",
      "Goalpara",
      "Golaghat",
      "Hailakandi",
      "Hojai",
      "Jorhat",
      "Kamrup Metropolitan",
      "Kamrup (Rural)",
      "Karbi Anglong",
      "Karimganj",
      "Kokrajhar",
      "Lakhimpur",
      "Majuli",
      "Morigaon",
      "Nagaon",
      "Nalbari",
      "Dima Hasao",
      "Sivasagar",
      "Sonitpur",
      "South Salmara Mankachar",
      "Tinsukia",
      "Udalguri",
      "West Karbi Anglong",
    ],
    Bihar: [
      "Araria",
      "Arwal",
      "Aurangabad",
      "Banka",
      "Begusarai",
      "Bhagalpur",
      "Bhojpur",
      "Buxar",
      "Darbhanga",
      "East Champaran",
      "Gaya",
      "Gopalganj",
      "Jamui",
      "Jehanabad",
      "Kaimur",
      "Katihar",
      "Khagaria",
      "Kishanganj",
      "Lakhisarai",
      "Madhepura",
      "Madhubani",
      "Munger",
      "Muzaffarpur",
      "Nalanda",
      "Nawada",
      "Patna",
      "Purnia",
      "Rohtas",
      "Saharsa",
      "Samastipur",
      "Saran",
      "Sheikhpura",
      "Sheohar",
      "Sitamarhi",
      "Siwan",
      "Supaul",
      "Vaishali",
      "West Champaran",
    ],
    Chhattisgarh: [
      "Balod",
      "Baloda Bazar",
      "Balrampur",
      "Bastar",
      "Bemetara",
      "Bijapur",
      "Bilaspur",
      "Dantewada",
      "Dhamtari",
      "Durg",
      "Gariaband",
      "Janjgir Champa",
      "Jashpur",
      "Kabirdham",
      "Kanker",
      "Kondagaon",
      "Korba",
      "Koriya",
      "Mahasamund",
      "Mungeli",
      "Narayanpur",
      "Raigarh",
      "Raipur",
      "Rajnandgaon",
      "Sukma",
      "Surajpur",
      "Surguja",
    ],
    Goa: ["North Goa", "South Goa"],
    Gujarat: [
      "Ahmedabad",
      "Amreli",
      "Anand",
      "Aravalli",
      "Banaskantha",
      "Bharuch",
      "Bhavnagar",
      "Botad",
      "Chhota Udaipur",
      "Dahod",
      "Dang",
      "Devbhoomi Dwarka",
      "Gandhinagar",
      "Gir Somnath",
      "Jamnagar",
      "Junagadh",
      "Kheda",
      "Kutch",
      "Mahisagar",
      "Mehsana",
      "Morbi",
      "Narmada",
      "Navsari",
      "Panchmahal",
      "Patan",
      "Porbandar",
      "Rajkot",
      "Sabarkantha",
      "Surat",
      "Surendranagar",
      "Tapi",
      "Vadodara",
      "Valsad",
    ],
    Haryana: [
      "Ambala",
      "Bhiwani",
      "Charkhi Dadri",
      "Faridabad",
      "Fatehabad",
      "Gurugram",
      "Hisar",
      "Jhajjar",
      "Jind",
      "Kaithal",
      "Karnal",
      "Kurukshetra",
      "Mahendragarh",
      "Mewat",
      "Palwal",
      "Panchkula",
      "Panipat",
      "Rewari",
      "Rohtak",
      "Sirsa",
      "Sonipat",
      "Yamunanagar",
    ],
    HimachalPradesh: [
      "Bilaspur",
      "Chamba",
      "Hamirpur",
      "Kangra",
      "Kinnaur",
      "Kullu",
      "Lahaul Spiti",
      "Mandi",
      "Shimla",
      "Sirmaur",
      "Solan",
      "Una",
    ],
    JammuKashmir: [
      "Anantnag",
      "Bandipora",
      "Baramulla",
      "Budgam",
      "Doda",
      "Ganderbal",
      "Jammu",
      "Kargil",
      "Kathua",
      "Kishtwar",
      "Kulgam",
      "Kupwara",
      "Leh",
      "Poonch",
      "Pulwama",
      "Rajouri",
      "Ramban",
      "Reasi",
      "Samba",
      "Shopian",
      "Srinagar",
      "Udhampur",
    ],
    Jharkhand: [
      "Bokaro",
      "Chatra",
      "Deoghar",
      "Dhanbad",
      "Dumka",
      "East Singhbhum",
      "Garhwa",
      "Giridih",
      "Godda",
      "Gumla",
      "Hazaribagh",
      "Jamtara",
      "Khunti",
      "Koderma",
      "Latehar",
      "Lohardaga",
      "Pakur",
      "Palamu",
      "Ramgarh",
      "Ranchi",
      "Sahebganj",
      "Seraikela Kharsawan",
      "Simdega",
      "West Singhbhum",
    ],
    Karnataka: [
      "Bagalkot",
      "Bangalore Rural",
      "Bangalore Urban",
      "Belgaum",
      "Bellary",
      "Bidar",
      "Vijayapura",
      "Chamarajanagar",
      "Chikkaballapur",
      "Chikkamagaluru",
      "Chitradurga",
      "Dakshina Kannada",
      "Davanagere",
      "Dharwad",
      "Gadag",
      "Gulbarga",
      "Hassan",
      "Haveri",
      "Kodagu",
      "Kolar",
      "Koppal",
      "Mandya",
      "Mysore",
      "Raichur",
      "Ramanagara",
      "Shimoga",
      "Tumkur",
      "Udupi",
      "Uttara Kannada",
      "Yadgir",
    ],
    Kerala: [
      "Alappuzha",
      "Ernakulam",
      "Idukki",
      "Kannur",
      "Kasaragod",
      "Kollam",
      "Kottayam",
      "Kozhikode",
      "Malappuram",
      "Palakkad",
      "Pathanamthitta",
      "Thiruvananthapuram",
      "Thrissur",
      "Wayanad",
    ],
    MadhyaPradesh: [
      "Agar Malwa",
      "Alirajpur",
      "Anuppur",
      "Ashoknagar",
      "Balaghat",
      "Barwani",
      "Betul",
      "Bhind",
      "Bhopal",
      "Burhanpur",
      "Chhatarpur",
      "Chhindwara",
      "Damoh",
      "Datia",
      "Dewas",
      "Dhar",
      "Dindori",
      "Guna",
      "Gwalior",
      "Harda",
      "Hoshangabad",
      "Indore",
      "Jabalpur",
      "Jhabua",
      "Katni",
      "Khandwa",
      "Khargone",
      "Mandla",
      "Mandsaur",
      "Morena",
      "Narsinghpur",
      "Neemuch",
      "Panna",
      "Raisen",
      "Rajgarh",
      "Ratlam",
      "Rewa",
      "Sagar",
      "Satna",
      "Sehore",
      "Seoni",
      "Shahdol",
      "Shajapur",
      "Sheopur",
      "Shivpuri",
      "Sidhi",
      "Singrauli",
      "Tikamgarh",
      "Ujjain",
      "Umaria",
      "Vidisha",
    ],
    Maharashtra: [
      "Ahmednagar",
      "Akola",
      "Amravati",
      "Aurangabad",
      "Beed",
      "Bhandara",
      "Buldhana",
      "Chandrapur",
      "Dhule",
      "Gadchiroli",
      "Gondia",
      "Hingoli",
      "Jalgaon",
      "Jalna",
      "Kolhapur",
      "Latur",
      "Mumbai City",
      "Mumbai Suburban",
      "Nagpur",
      "Nanded",
      "Nandurbar",
      "Nashik",
      "Osmanabad",
      "Palghar",
      "Parbhani",
      "Pune",
      "Raigad",
      "Ratnagiri",
      "Sangli",
      "Satara",
      "Sindhudurg",
      "Solapur",
      "Thane",
      "Wardha",
      "Washim",
      "Yavatmal",
    ],
    Manipur: [
      "Bishnupur",
      "Chandel",
      "Churachandpur",
      "Imphal East",
      "Imphal West",
      "Jiribam",
      "Kakching",
      "Kamjong",
      "Kangpokpi",
      "Noney",
      "Pherzawl",
      "Senapati",
      "Tamenglong",
      "Tengnoupal",
      "Thoubal",
      "Ukhrul",
    ],
    Meghalaya: [
      "East Garo Hills",
      "East Jaintia Hills",
      "East Khasi Hills",
      "North Garo Hills",
      "Ri Bhoi",
      "South Garo Hills",
      "South West Garo Hills",
      "South West Khasi Hills",
      "West Garo Hills",
      "West Jaintia Hills",
      "West Khasi Hills",
    ],
    Mizoram: [
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
      "Aizawl",
      "Champhai",
      "Kolasib",
      "Lawngtlai",
      "Lunglei",
      "Mamit",
      "Saiha",
      "Serchhip",
    ],
    Nagaland: [
      "Dimapur",
      "Kiphire",
      "Kohima",
      "Longleng",
      "Mokokchung",
      "Mon",
      "Peren",
      "Phek",
      "Tuensang",
      "Wokha",
      "Zunheboto",
    ],
    Odisha: [
      "Angul",
      "Balangir",
      "Balasore",
      "Bargarh",
      "Bhadrak",
      "Boudh",
      "Cuttack",
      "Debagarh",
      "Dhenkanal",
      "Gajapati",
      "Ganjam",
      "Jagatsinghpur",
      "Jajpur",
      "Jharsuguda",
      "Kalahandi",
      "Kandhamal",
      "Kendrapara",
      "Kendujhar",
      "Khordha",
      "Koraput",
      "Malkangiri",
      "Mayurbhanj",
      "Nabarangpur",
      "Nayagarh",
      "Nuapada",
      "Puri",
      "Rayagada",
      "Sambalpur",
      "Subarnapur",
      "Sundergarh",
    ],
    Punjab: [
      "Amritsar",
      "Barnala",
      "Bathinda",
      "Faridkot",
      "Fatehgarh Sahib",
      "Fazilka",
      "Firozpur",
      "Gurdaspur",
      "Hoshiarpur",
      "Jalandhar",
      "Kapurthala",
      "Ludhiana",
      "Mansa",
      "Moga",
      "Mohali",
      "Muktsar",
      "Pathankot",
      "Patiala",
      "Rupnagar",
      "Sangrur",
      "Shaheed Bhagat Singh Nagar",
      "Tarn Taran",
    ],
    Rajasthan: [
      "Ajmer",
      "Alwar",
      "Banswara",
      "Baran",
      "Barmer",
      "Bharatpur",
      "Bhilwara",
      "Bikaner",
      "Bundi",
      "Chittorgarh",
      "Churu",
      "Dausa",
      "Dholpur",
      "Dungarpur",
      "Ganganagar",
      "Hanumangarh",
      "Jaipur",
      "Jaisalmer",
      "Jalore",
      "Jhalawar",
      "Jhunjhunu",
      "Jodhpur",
      "Karauli",
      "Kota",
      "Nagaur",
      "Pali",
      "Pratapgarh",
      "Rajsamand",
      "Sawai Madhopur",
      "Sikar",
      "Sirohi",
      "Tonk",
      "Udaipur",
    ],
    Sikkim: ["East Sikkim", "North Sikkim", "South Sikkim", "West Sikkim"],
    TamilNadu: [
      "Ariyalur",
      "Chennai",
      "Coimbatore",
      "Cuddalore",
      "Dharmapuri",
      "Dindigul",
      "Erode",
      "Kanchipuram",
      "Kanyakumari",
      "Karur",
      "Krishnagiri",
      "Madurai",
      "Nagapattinam",
      "Namakkal",
      "Nilgiris",
      "Perambalur",
      "Pudukkottai",
      "Ramanathapuram",
      "Salem",
      "Sivaganga",
      "Thanjavur",
      "Theni",
      "Thoothukudi",
      "Tiruchirappalli",
      "Tirunelveli",
      "Tiruppur",
      "Tiruvallur",
      "Tiruvannamalai",
      "Tiruur",
      "Vellore",
      "Viluppuram",
      "Virudhunagar",
    ],
    Telangana: [
      "Adilabad",
      "Bhadradri Kothagudem",
      "Hyderabad",
      "Jagtial",
      "Jangaon",
      "Jayashankar",
      "Jogulamba",
      "Kamareddy",
      "Karimnagar",
      "Khammam",
      "Komaram Bheem",
      "Mahabubabad",
      "Mahbubnagar",
      "Mancherial",
      "Medak",
      "Medchal",
      "Nagarkurnool",
      "Nalgonda",
      "Nirmal",
      "Nizamabad",
      "Peddapalli",
      "Rajanna Sircilla",
      "Ranga Reddy",
      "Sangareddy",
      "Siddipet",
      "Suryapet",
      "Vikarabad",
      "Wanaparthy",
      "Warangal Rural",
      "Warangal Urban",
      "Yadadri Bhuvanagiri",
    ],
    Tripura: [
      "Dhalai",
      "Gomati",
      "Khowai",
      "North Tripura",
      "Sepahijala",
      "South Tripura",
      "Unakoti",
      "West Tripura",
    ],
    UttarPradesh: [
      "Agra",
      "Aligarh",
      "Allahabad",
      "Ambedkar Nagar",
      "Amethi",
      "Amroha",
      "Auraiya",
      "Azamgarh",
      "Baghpat",
      "Bahraich",
      "Ballia",
      "Balrampur",
      "Banda",
      "Barabanki",
      "Bareilly",
      "Basti",
      "Bhadohi",
      "Bijnor",
      "Budaun",
      "Bulandshahr",
      "Chandauli",
      "Chitrakoot",
      "Deoria",
      "Etah",
      "Etawah",
      "Faizabad",
      "Farrukhabad",
      "Fatehpur",
      "Firozabad",
      "Gautam Buddha Nagar",
      "Ghaziabad",
      "Ghazipur",
      "Gonda",
      "Gorakhpur",
      "Hamirpur",
      "Hapur",
      "Hardoi",
      "Hathras",
      "Jalaun",
      "Jaunpur",
      "Jhansi",
      "Kannauj",
      "Kanpur Dehat",
      "Kanpur Nagar",
      "Kasganj",
      "Kaushambi",
      "Kheri",
      "Kushinagar",
      "Lalitpur",
      "Lucknow",
      "Maharajganj",
      "Mahoba",
      "Mainpuri",
      "Mathura",
      "Mau",
      "Meerut",
      "Mirzapur",
      "Moradabad",
      "Muzaffarnagar",
      "Pilibhit",
      "Pratapgarh",
      "Raebareli",
      "Rampur",
      "Saharanpur",
      "Sambhal",
      "Sant Kabir Nagar",
      "Shahjahanpur",
      "Shamli",
      "Shravasti",
      "Siddharthnagar",
      "Sitapur",
      "Sonbhadra",
      "Sultanpur",
      "Unnao",
      "anasi",
    ],
    Uttarakhand: [
      "Almora",
      "Bageshwar",
      "Chamoli",
      "Champawat",
      "Dehradun",
      "Haridwar",
      "Nainital",
      "Pauri",
      "Pithoragarh",
      "Rudraprayag",
      "Tehri",
      "Udham Singh Nagar",
      "Uttarkashi",
    ],
    WestBengal: [
      "Alipurduar",
      "Bankura",
      "Birbhum",
      "Cooch Behar",
      "Dakshin Dinajpur",
      "Darjeeling",
      "Hooghly",
      "Howrah",
      "Jalpaiguri",
      "Jhargram",
      "Kalimpong",
      "Kolkata",
      "Malda",
      "Murshidabad",
      "Nadia",
      "North 24 Parganas",
      "Paschim Bardhaman",
      "Paschim Medinipur",
      "Purba Bardhaman",
      "Purba Medinipur",
      "Purulia",
      "South 24 Parganas",
      "Uttar Dinajpur",
    ],
    AndamanNicobar: ["Nicobar", "North Middle Andaman", "South Andaman"],
    Chandigarh: ["Chandigarh"],
    DadraHaveli: ["Dadra Nagar Haveli"],
    DamanDiu: ["Daman", "Diu"],
    Delhi: [
      "Central Delhi",
      "East Delhi",
      "New Delhi",
      "North Delhi",
      "North East Delhi",
      "North West Delhi",
      "Shahdara",
      "South Delhi",
      "South East Delhi",
      "South West Delhi",
      "West Delhi",
    ],
    Lakshadweep: ["Lakshadweep"],
    Puducherry: ["Karaikal", "Mahe", "Puducherry", "Yanam"],
  };

  // const handleStateChange = (event) => {
  //   const stateValue = event.target.value;
  //   setSelectedState(stateValue);
  //   setSelectedcity("");

  //   setNewEmployee((prevEmployee) => ({
  //     ...prevEmployee,
  //     Emp_state: stateValue,
  //   }));
  // };

  // const handlecityChange = (event) => {
  //   const cityValue = event.target.value;
  //   setSelectedcity(cityValue);

  //   setNewEmployee((prevEmployee) => ({
  //     ...prevEmployee,
  //     Emp_city: cityValue,
  //   }));
  // };

  // const cityOptions = selectedState
  //   ? statesData[selectedState].map((Emp_city) => (
  //       <MenuItem key={Emp_city} value={Emp_city}>
  //         {Emp_city}
  //       </MenuItem>
  //     ))
  //   : null;
  const handleStateChange = (event) => {
    const stateValue = event.target.value;
    setSelectedState(stateValue);

    // Check if the selected state exists in the statesData object
    if (statesData[stateValue]) {
      const stateCities = statesData[stateValue];
      if (stateCities.length > 0) {
        setSelectedcity(stateCities[0]);
        setNewEmployee((prevEmployee) => ({
          ...prevEmployee,
          Emp_state: stateValue,
          Emp_city: stateCities[0], // Update Emp_city with the first city
        }));
      } else {
        setSelectedcity(''); // No cities available
        setNewEmployee((prevEmployee) => ({
          ...prevEmployee,
          Emp_state: stateValue,
          Emp_city: '', // Reset Emp_city when no cities are available
        }));
      }
    } else {
      setSelectedcity(''); // Selected state doesn't exist
      setNewEmployee((prevEmployee) => ({
        ...prevEmployee,
        Emp_state: stateValue,
        Emp_city: '', // Reset Emp_city
      }));
    }
  };

  const handlecityChange = (event) => {
    const cityValue = event.target.value;
    setSelectedcity(cityValue);

    setNewEmployee((prevEmployee) => ({
      ...prevEmployee,
      Emp_city: cityValue,
    }));
  }

  const cityOptions = selectedState
    ? statesData[selectedState].map((city) => (
        <MenuItem key={city} value={city}>
          {city}
        </MenuItem>
      ))
    : null;

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const { onFormSubmitEdit } = useAPI();
  const onFormSubmit11 = (e) => {
    onFormSubmitEdit(selectedEmployee._id, newEmployee);

    if (!isEmailValid(newEmployee.email)) {
      alert("Invalid email format");
      return;
    }
    // window.location.reload();
    console.log(newEmployee);
  };

  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  } 


  useEffect(() => {
    if (selectedEmployee) {
      const emp = {
        Emp_ID:selectedEmployee.Emp_ID,
        Emp_name: selectedEmployee.Emp_name,
        email: selectedEmployee.email,
        Emp_contact_No: selectedEmployee.Emp_contact_No,
        Emp_department: selectedEmployee.Emp_department,
        Emp_city: selectedEmployee.Emp_city,
        Emp_state: selectedEmployee.Emp_state,
        Emp_DOB: selectedEmployee.Emp_DOB,
        Emp_joining_date: selectedEmployee.Emp_joining_date,
        Emp_blood_group: selectedEmployee.Emp_blood_group,
        Emp_qualification: selectedEmployee.Emp_qualification,
        Emp_expertise: selectedEmployee.Emp_expertise,
      };

      setNewEmployee(emp);
    }
  }, [selectedEmployee]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className="modal-container">
            <h2>Edit Employee</h2>
            <div className="grid-container">
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_name"
                    label="Employee Name"
                    value={newEmployee.Emp_name}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                  />
                </div>
                <div className="grid-item">
                <TextField
                  type="text"
                  name="Emp_ID"
                  label="Employee ID"
                  value={newEmployee.Emp_ID}
                  onChange={handleInputChange}
                  fullWidth
                  margin="normal"
                />
              </div>
              </div>
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="email"
                    name="email"
                    label="Employee E-mail"
                    value={newEmployee.email}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="tel"
                    name="Emp_contact_No"
                    label="Employee Contact Number"
                    value={newEmployee.Emp_contact_No}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                    inputProps={{
                      inputMode: 'numeric',
                      pattern: '[0-9]{10}', 
                      maxLength: 10, 
                      minLength:10
                    }}
                  />
                </div>
              </div>
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_qualification"
                    label="Qualification"
                    value={newEmployee.Emp_qualification}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_department"
                    label="Department"
                    value={newEmployee.Emp_department}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
              </div>
              <div className="grid-row">
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_expertise"
                    label="Expertise"
                    value={newEmployee.Emp_expertise}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
                <div className="grid-item">
                  <TextField
                    type="text"
                    name="Emp_blood_group"
                    label="Blood Group"
                    value={newEmployee.Emp_blood_group}
                    onChange={handleInputChange}
                    fullWidth
                    margin="normal"
                    required
                  />
                </div>
              </div>
              <div className="grid-row">
                <div className="grid-item">
                  <Select
                    name="Emp_state"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={newEmployee.state}
                    label="State"
                    style={{ color: "black", marginTop: "15px" }}
                    fullWidth
                    value={selectedState}
                    onChange={handleStateChange}

                    // onChange={handleInputChange}
                  >
                    <MenuItem>Select</MenuItem>
                    {Object.keys(statesData).map((state) => (
                      <MenuItem value={state} key={state}>
                        {state}
                      </MenuItem>
                    ))}
                  </Select>
                </div>
                <div className="grid-item">
                  <Select
                    name="Emp_city"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    // value={newEmployee.city}
                    label="City"
                    style={{ color: "black", marginTop: "15px" }}
                    fullWidth
                    // onChange={handleInputChange}
                    value={selectedcity}
                    onChange={handlecityChange}
                  >
                    <MenuItem value="">Select</MenuItem>
                    {cityOptions}
                  </Select>
                </div>
              </div>
              <div className="grid-row mt-3">
                <div className="grid-item ">
                  <label>Date of Birth</label>
                  <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    name="Emp_DOB"
                    value={newEmployee.Emp_DOB}
                    onChange={handleInputChange}
                    required
                    max={getCurrentDate()}
                    style={{
                      width: "23.25rem",
                      height: "3.3rem",
                      marginTop: "5px",
                      maxWidth: "100%",
                    }}
                  />
                </div>

                <div className="grid-item">
                  <label>Date of Joining</label>
                  <input
                    type="date"
                    placeholder="DD/MM/YYYY"
                    name="Emp_joining_date"
                    required
                    value={newEmployee.Emp_joining_date}
                    onChange={handleInputChange}
                    style={{
                      width: "23.25rem",
                      height: "3.3rem",
                      marginTop: "5px",
                      maxWidth: "100%",
                    }}
                    min="2010-01-01"
                    max={getCurrentDate()}
                  />
                </div>
              </div>

              <Button
                variant="contained"
                color="primary"
                onClick={onFormSubmit11}
              >
                Add Employee
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </>
  );
};

export default EditEmployeeModal;
