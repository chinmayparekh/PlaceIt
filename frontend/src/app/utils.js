const sortJobList = (criteria, originalList) => {
  let sortedList = [];
  switch (criteria) {
    // case "created-asc":
    //   break;
    // case "created-desc":
    //   break;
    case "title": // eligibility
      sortedList = originalList.sort((a, b) => {
        return a.eligibility.localeCompare(b.eligibility);
      });
      break;
    case "company": // company name
      sortedList = originalList.sort((a, b) => {
        return a.companyName.localeCompare(b.companyName);
      });
      break;
    case "deadline": // deadline
      sortedList = originalList.sort((a, b) => {
        const date1 = new Date(a.appDeadline);
        const date2 = new Date(b.appDeadline);
        console.log("deadline:", date1, date1.getTime() > date2.getTime());
        return date1.getTime() < date2.getTime() ? -1 : 0;
      });
      break;
    case "role": // role
      sortedList = originalList.sort((a, b) => {
        return a.jobRole.localeCompare(b.jobRole);
      });
      break;
    default:
      break;
  }
  console.log("Returning SORTED LIST :", sortedList);
  return sortedList;
};

export { sortJobList };
