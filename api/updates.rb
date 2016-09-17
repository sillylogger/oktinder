def updates last_activity_date = '2016-09-02T19:02:52.834Z'
  options = HTTP::Options.new(
    headers: headers,
    json: {
      last_activity_date: last_activity_date
    }
  )

  url = "https://api.gotinder.com/updates"
  res = HTTP.post(url, options)
  JSON.parse(res.body)
end
