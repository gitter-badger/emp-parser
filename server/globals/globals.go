package globals

import (
	"log"
	"os"
)

// Main channel pour attente des routines
var Ch chan int

// Logger d'erreur principal
var ErrLogger = log.New(os.Stderr, "[error] ", 0)
