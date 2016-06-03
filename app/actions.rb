require 'sinatra'

# Homepage (Root path)
get '/' do
  erb :index
end
