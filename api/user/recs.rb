def fetch token
  options = HTTP::Options.new(headers: headers)
  res = HTTP.get("https://api.gotinder.com/user/recs", options)
  JSON.parse(res.body)["results"]
end
