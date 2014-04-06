require 'require_all'

module Stik ; end

require_all './modules/**/*.rb'

use Stik::Docs

run Stik::Home
