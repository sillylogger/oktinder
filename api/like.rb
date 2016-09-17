def like token, id, content_hash, user_traveling
  options = HTTP::Options.new(headers: headers)

  url = "https://api.gotinder.com/like/#{id}?content_hash=#{content_hash}"
  url += "&user_traveling=1" if user_traveling

  res = HTTP.post(url, options)
  JSON.parse(res.body)
end
