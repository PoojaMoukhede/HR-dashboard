import {
  UilEstate,
  UilClipboardAlt,
  UilUsersAlt,
  UilChart,
  UilMoneyWithdrawal,
  UilHeadphonesAlt,
} from "@iconscout/react-unicons";

const img1 =
  "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cGVyc29ufGVufDB8fDB8fHww&w=1000&q=80";
const img2 =
  "https://www.nicepng.com/png/full/182-1829287_cammy-lin-ux-designer-circle-picture-profile-girl.png";
const img3 =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsF6ibnOK4cx1KOlUyJDshjWDbw759KlRWvg&usqp=CAU";

export const SidebarData = [
  {
    icon: UilEstate,
    heading: "Dashboard",
    path: "/dashboard",
  },
  {
    icon: UilClipboardAlt,
    heading: "Reports",
    path: "/reports",
  },
  {
    icon: UilUsersAlt,
    heading: "Members",
    path: "/members",
  },
  {
    icon: UilChart,
    heading: "Analysis",
    path: "/analysis",
  },
  {
    icon: UilHeadphonesAlt,
    heading: "Complaint",
    path: "/complaint",
    nestedItems: [
      {
        icon: UilChart,
        heading: "View Complaints",
        path: "/complaint/contact",
      },
      {
        icon: UilHeadphonesAlt,
        heading: "Edit Complaints",
        path: "/complaint/view",
      },
    ],
  },
];
export const CardsData = [
  {
    title: "Attandance",
    color: {
      backGround:
        "linear-gradient(180deg,rgb(71, 72, 102) 0% , rgb(169, 171, 184) 100%)",
      boxshadow: "0px 10px 20px 0px #e0c6f5",
    },
    dataLabels: {
      style: {
        colors: ["#F44336"],
      },
    },
    barValue: 92,
    value: "28",
    png: UilUsersAlt,
    series: [
      {
        name: "Attandance",
        data: [30, 32, 31, 32, 32, 29, 30],
      },
    ],
  },
  {
    title: "Fuel Consumption",
    color: {
      // backGround: "linear-gradient(180deg,rgb(71, 72, 102) 0% , rgb(169, 171, 184) 100%)",
      backGround:
        "linear-gradient(180deg,rgb(45, 156, 202) 0% , rgb(41, 101, 138) 100%)",
      boxshadow: "0px 10px 20px 0px #fdc0c7",
    },
    barValue: 80,
    value: "140",
    png: UilMoneyWithdrawal,
    series: [
      {
        name: "Revenue",
        data: [135, 120, 130, 125, 120, 100, 140],
      },
    ],
  },
  {
    title: "Expenses",
    color: {
      backGround:
        "linear-gradient(180deg,rgb(125, 198, 231) 0% , rgb(40, 63, 70) 100%)",
      // backGround:
      //   "linear-gradient(rgb(110, 102, 89) -146.42%, rgb(71, 72, 102) -46.42%)",
      boxshadow: "0px 10px 20px 0px #f9d59b",
    },
    barValue: 60,
    value: "4,270",
    png: UilClipboardAlt,
    series: [
      {
        name: "Expenses",
        data: [4100, 4025, 5215, 5030, 4512, 4715, 3020],
      },
    ],
  },
];

export const UpdatesData = [
  {
    img: img1,
    name: "Pooja Moukhede",
    noti: "has birthday today wish her.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "Dhruva Solanki",
    noti: "joined software department today",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Swati Chouhan",
    noti: "has 2nd year of work anniversary.",
    time: "2 hours ago",
  },
];

export const chartData = {
  options: {
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "black",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "black",
        },
      },
    },
    colors: ["#2b5161"],
    dataLabels: {
      // Add this section to hide data labels on bars
      enabled: false,
    },
  },

  series: [
    {
      name: "Expenses",
      data: [
        38000, 40000, 55000, 50000, 49000, 46000, 70000, 62000, 68000, 73000,
        55000, 68000,
      ],
    },
  ],
};
export const chartData2 = {
  options: {
    chart: {
      id: "basic-bar2",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
      ],
      labels: {
        style: {
          colors: "black",
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: "black",
        },
      },
    },
    colors: ["#22437e"],
    tooltip: {
      style: {
        colors: "#fd929d", // Change this to your desired tooltip font color
      },
    },
    dataLabels: {
      // Add this section to hide data labels on bars
      enabled: false,
    },
  },
  series: [
    {
      name: "Fuel Consumption",
      data: [32, 35, 48, 35, 42, 44, 55, 45, 36, 52, 46, 43],
    },
  ],
};

export const Baroptions = {
  series: [600, 579, 21],
  chart: {
    width: 380,
    // type: 'pie',
  },
  labels: ['Total', 'Present', 'Absent'],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
}