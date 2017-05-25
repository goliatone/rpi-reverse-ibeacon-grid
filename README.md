

iBeacon RSSI smooth

Distance:
stackoverflow

protected static double calculateAccuracy(int txPower, double rssi) {
  if (rssi == 0) {
    return -1.0; // if we cannot determine accuracy, return -1.
  }

  double ratio = rssi*1.0/txPower;
  if (ratio < 1.0) {
    return Math.pow(ratio,10);
  }
  else {
    double accuracy =  (0.89976)*Math.pow(ratio,7.7095) + 0.111;    
    return accuracy;
  }}   

 kalman filter:
https://wouterbulten.nl/blog/tech/kalman-filters-explained-removing-noise-from-rssi-signals/
https://wouterbulten.nl/blog/tech/lightweight-javascript-library-for-noise-filtering/

Examples using kalmanjs:
smooth RSSi, distance, WiFi, etc
beacon-tracking
oliot
one-piece: most useful
2null16-bra: distance
GPS
Estimote
WiFi smoothing


Swift
https://github.com/wearereasonablepeople/KalmanFilter




https://dobots.nl/2015/09/03/human-slam-indoor-localization-using-particle-filters/

read post about research
WiFI post
how ibeacons work for indoor location

Implement a particle filter

JS genetic algorithm roulette wheel selection

iOS library using corebluetooth to deal with beacons

Object tracking, particle filter with ease <====

Reverse engineering estimote

post study about beacon trilateration
