package globals

// Creneau ..
type Creneau struct {
	Summary      string
	Location     string
	Description  string
	DateStart    int // Timestamp
	DateEnd      int // Timestamp
	LastModified int // Timestamp
}

// UE ..
type UE struct {
	Name        string
	Description string
}
