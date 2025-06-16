
export  const formatJoinDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
export  const formatMessageTime = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
  };