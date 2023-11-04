//Libraries 
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Time "mo:base/Time";
import Float "mo:base/Float";

//DeFi Bank actor(Class) 
actor DBank {
  stable var currentValue: Float = 300; //stable => Orth persist
  currentValue := 7000;
  Debug.print(debug_show(currentValue));
  
  stable var startTime = Time.now();
  startTime := Time.now();
  Debug.print(debug_show(startTime));
  let id = 12345678;

  //Pub function for depositing amount to the account
  public func topUp(amount : Float) {
    currentValue += amount;
    Debug.print(debug_show(currentValue));
  };

  //Pub function for withdrawl from the account
  public func withdrawl(amount : Float) {
    let tempValue: Float = currentValue- amount;
    //cond for Amonut of withdrawl < currentValue  
    if(tempValue - amount >= 0) {
      currentValue -= amount;
      Debug.print(debug_show(currentValue));
    }
    else {
      Debug.print("Amount to large, currentValue less than zero");
    }
  };

  //Pub Query func for cheking the currentBalance
  public query func checkBalance(): async Float{
    return currentValue;
  };
  
  public func compound() {
    let currentTime = Time.now();
    let timeElapsedNS = currentTime - startTime;
    let timeElapsedS = timeElapsedNS/1000000000;
    currentValue := currentValue * (1.000001 ** Float.fromInt(timeElapsedS));
  };
}
