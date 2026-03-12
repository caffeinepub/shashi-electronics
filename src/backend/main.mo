import Array "mo:core/Array";
import Runtime "mo:core/Runtime";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Map "mo:core/Map";

actor {
  // New booking type with serviceType and message
  type Booking = {
    customerName : Text;
    phoneNumber : Text;
    serviceType : Text;
    message : Text;
    timestamp : Time.Time;
  };

  // Legacy type matching the previously stored stable data
  type BookingV1 = {
    customerName : Text;
    phoneNumber : Text;
    tvBrand : Text;
    issueDescription : Text;
    timestamp : Time.Time;
  };

  var nextId = 0;

  // Keep old variable name so Motoko deserialises existing stable memory
  let bookings = Map.empty<Nat, BookingV1>();

  // New store for current and future bookings
  let bookingsV2 = Map.empty<Nat, Booking>();

  // Migrate any legacy entries on upgrade
  system func postupgrade() {
    for ((id, b) in bookings.entries()) {
      bookingsV2.add(
        id,
        {
          customerName = b.customerName;
          phoneNumber = b.phoneNumber;
          serviceType = b.tvBrand;
          message = b.issueDescription;
          timestamp = b.timestamp;
        },
      );
      if (id + 1 > nextId) {
        nextId := id + 1;
      };
    };
  };

  public shared ({ caller }) func submitBooking(
    customerName : Text,
    phoneNumber : Text,
    serviceType : Text,
    message : Text,
  ) : async Nat {
    let id = nextId;
    nextId += 1;
    bookingsV2.add(
      id,
      {
        customerName;
        phoneNumber;
        serviceType;
        message;
        timestamp = Time.now();
      },
    );
    id;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    bookingsV2.values().toArray();
  };

  public query ({ caller }) func getBooking(id : Nat) : async Booking {
    switch (bookingsV2.get(id)) {
      case (null) { Runtime.trap("Booking does not exist") };
      case (?booking) { booking };
    };
  };
};
