import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";

actor {
  type Booking = {
    customerName : Text;
    phoneNumber : Text;
    tvBrand : Text;
    issueDescription : Text;
    timestamp : Time.Time;
  };

  var nextId = 0;
  let bookings = Map.empty<Nat, Booking>();

  public shared ({ caller }) func submitBooking(customerName : Text, phoneNumber : Text, tvBrand : Text, issueDescription : Text) : async Nat {
    let id = nextId;
    nextId += 1;

    let booking : Booking = {
      customerName;
      phoneNumber;
      tvBrand;
      issueDescription;
      timestamp = Time.now();
    };

    bookings.add(id, booking);
    id;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookings.values().toArray();
  };

  public query ({ caller }) func getBooking(id : Nat) : async Booking {
    switch (bookings.get(id)) {
      case (null) { Runtime.trap("Booking does not exist") };
      case (?booking) { booking };
    };
  };
};
