export interface Keypoint {
  x: number;
  y: number;
  name: string;
  confidence: number;
}

export interface BoundingBox {
  yMin: number;
  xMin: number;
  yMax: number;
  xMax: number;
  width: number;
  height: number;
}

export interface PoseData {
  keypoints: Keypoint[];
  box: BoundingBox;
  id: number;
  confidence: number;
  nose: Keypoint;
  left_eye: Keypoint;
  right_eye: Keypoint;
  left_ear: Keypoint;
  right_ear: Keypoint;
  left_shoulder: Keypoint;
  right_shoulder: Keypoint;
  left_elbow: Keypoint;
  right_elbow: Keypoint;
  left_wrist: Keypoint;
  right_wrist: Keypoint;
  left_hip: Keypoint;
  right_hip: Keypoint;
  left_knee: Keypoint;
  right_knee: Keypoint;
  left_ankle: Keypoint;
  right_ankle: Keypoint;
}

export type Connection = [number, number];

export type PoseName = 
  'inTheSkyMessi' |
  'saluteLinda' |
  'innerPeaceSalah' |
  'ironMikeTyson' |
  'shooterYusuf' |
  'wednesdayJenna' |
  'sailorMoon' |
  'inSightDybala' |
  'gunsJosuke' |
  'standJoseph' |
  'Idle' |
  ''