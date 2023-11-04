const daysLeft = (dateString: string) => {
  const date = new Date(dateString);
  const today = new Date();
  const cmas = new Date(today.getFullYear(), date.getMonth(), date.getDate());

  const oneDay = 1000 * 60 * 60 * 24;

  return Math.ceil((cmas.getTime() - today.getTime()) / oneDay) + ' days left';
};

export default daysLeft;
