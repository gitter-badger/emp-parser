package globals

// Creneau ..
type Creneau struct {
	Summary      string // Identifiant de l'UE
	Location     string
	Description  string // Cleané pour affichage allégé
	DateStart    int    // Timestamp
	DateEnd      int    // Timestamp
	LastModified int    // Timestamp
}

// UE ..
type UE struct {
	Name        string
	Description string // Pas cleané
}
