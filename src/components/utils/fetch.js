const fetchCurrencies = async () => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const json = await response.json();
  return json;
};

export default fetchCurrencies;
