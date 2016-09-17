$facebook_info = {
  'facebook_token': $conf['facebook_token'],
  'facebook_id':    $conf['facebook_id'],
  'locale':         $conf['locale'],
  'force_refresh':  false
}

def gettoken
  res = HTTP.post("https://api.gotinder.com/auth", json: $facebook_info)
  JSON.parse(res.body)
end
