import pose1 from "../../assets/poses/pose1.png"
import pose2 from "../../assets/poses/pose2.png"
import pose3 from "../../assets/poses/pose3.png"
import pose4 from "../../assets/poses/pose4.png"
import pose5 from "../../assets/poses/pose5.png"
import pose6 from "../../assets/poses/pose6.png"
import pose7 from "../../assets/poses/pose7.png"
import pose8 from "../../assets/poses/pose8.png"
import pose9 from "../../assets/poses/pose9.png"
import pose10 from "../../assets/poses/pose10.png"
import { PoseName } from "../../types/BodyPose.types"

export const poseImageDictionary: { [key in PoseName]: string; } = {
  "inTheSkyMessi": pose1,
  "saluteLinda": pose2,
  "innerPeaceSalah": pose3,
  "ironMikeTyson": pose4,
  "shooterYusuf": pose5,
  "wednesdayJenna": pose6,
  "sailorMoon": pose7,
  "inSightDybala": pose8,
  "gunsJosuke": pose9,
  "standJoseph": pose10,

  "": pose1,
  "idle": pose1,
  "empty": pose1
}

export const poseNameDictionary: { [key in PoseName]: string; } = {
  "inTheSkyMessi": "Messi",
  "saluteLinda": "Linda",
  "innerPeaceSalah": "Salah",
  "ironMikeTyson": "Tyson",
  "shooterYusuf": "Yusuf",
  "wednesdayJenna": "Jenna",
  "sailorMoon": "Sailor Moon",
  "inSightDybala": "Dybala",
  "gunsJosuke": "Josuke",
  "standJoseph": "Joseph",

  "": "",
  "idle": "",
  empty: ""
}