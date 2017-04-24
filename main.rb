#! /usr/bin/env ruby

require 'bundler'
require 'fileutils'
Bundler.require(:default)

require './config'
require './api/auth'
require './api/updates'

@token = gettoken["token"]

def headers
  {
    'platform':        $conf['android'],
    'X-Auth-Token':    @token,
    'User-Agent':      $conf['user_agent'],
    'os-version':      $conf['os_version'],
    'Accept-Language': $conf['accept_language'],
    'app-version':     $conf['app_version'],
    'Connection':      'Keep-Alive'
  }
end

def update? name
  return true unless File.exists? name

  one_day_ago = Time.now - 60 * 60 * 24
  File.mtime(name) < one_day_ago
end


def archive! name
  return unless File.exists? name

  t = File.mtime name
  FileUtils.mv name, "updates-#{t.year}-#{t.month}-#{t.day}.json"
end

filename = 'updates.json'

if update? filename
  puts "I going to update.json"

  archive! filename

  json = updates ''
  File.open filename, 'w' do |f|
    f.write json.to_json
  end

else
  puts "I am not going to update.json"
end

#
# I dont want to like everyone *just* yet.
#
# ids = {}
#
# 1000.times do
#   items = fetch(token)
#
#   if items == nil || items.size == 0
#     puts "done!!"
#     break
#   end
#
#   items.each do |item|
#     user = item["user"]
#     unless user
#       p user
#       next
#     end
#
#     id = user["_id"]
#     content_hash = user["content_hash"]
#     female = user["gender"] == 1
#
#     unless female
#       puts "Wrong gender!!!!"
#       next
#     end
#
#     puts "birth_date: #{user["birth_date"]} from: #{user['distance_mi']}, bio: #{user['bio']}"
#     if ids[id]
#       puts "duplicated"
#     else
#       puts user["photos"].map { |p| p["url"] }
#       p like(token, id, content_hash, true)
#       ids[id] = true
#       # sleep(1 + rand(10) / 10.0)
#     end
#   end
#
#   puts "Total likes: #{ids.count}"
#   sleep(10 + rand(10))
# end
#
