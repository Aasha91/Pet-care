$(document).ready(function () {

    // Load owners into Pet Owner dropdown
$.ajax({
    url: "/api/owners",
    method: "GET",

    success: function (owners) {

        const ownerSelect = $("#petOwner");

        ownerSelect.empty();

        ownerSelect.append(
            '<option value="">Select Owner</option>'
        );

        owners.forEach(function (owner) {

            ownerSelect.append(
                `<option value="${owner.owner_id}">
                    ${owner.name}
                </option>`
            );

        });
    },

    error: function (xhr) {
        console.error(
            "Failed to load owners:",
            xhr.responseText
        );
    }
});

// Load owners table
function loadOwners() {
    $.ajax({
        url: "/api/owners",
        method: "GET",

        success: function (owners) {

            const ownerSelect = $("#petOwner");
            ownerSelect.empty();
            ownerSelect.append('<option value="">Select Owner</option>');

            const tableBody = $("#ownerTableBody");
            tableBody.empty();

            owners.forEach(function (owner) {

                ownerSelect.append(
                    `<option value="${owner.owner_id}">${owner.name}</option>`
                );

                const row = `
                    <tr>
                        <td>${owner.owner_id}</td>
                        <td>${owner.name}</td>
                        <td>${owner.phone}</td>
                        <td>${owner.email || ""}</td>
                        <td>${owner.address || ""}</td>
                        <td>
                            <button class="edit-btn" onclick="editOwner(${owner.owner_id})">Edit</button>
                            <button class="delete-btn" onclick="deleteOwner(${owner.owner_id})">Delete</button>
                        </td>
                    </tr>
                `;

                tableBody.append(row);
            });
        },

        error: function (error) {
            console.error("Failed to load owners:", error);
        }
    });
}

$(document).ready(function () {

    // Send session cookies with all AJAX requests
    $.ajaxSetup({
        xhrFields: { withCredentials: true }
    });

// Load pets into Appointment dropdown
$.ajax({
    url: "/api/pets",
    method: "GET",

    success: function (pets) {

        const petSelect = $("#appointmentPet");

        petSelect.empty();

        petSelect.append(
            '<option value="">Select Pet</option>'
        );

        pets.forEach(function (pet) {

            petSelect.append(
                `<option value="${pet.pet_id}">
                    ${pet.pet_name} - ${pet.owner_name}
                </option>`
            );

        });
    },

    error: function (xhr) {

        console.error(
            "Failed to load pets:",
            xhr.responseText
        );
    }
});

// Load pets into Treatment dropdown
$.ajax({
    url: "/api/pets",
    method: "GET",

    success: function (pets) {

        const petSelect = $("#treatmentPet");

        petSelect.empty();

        petSelect.append(
            '<option value="">Select Pet</option>'
        );

        pets.forEach(function (pet) {

            petSelect.append(
                `<option value="${pet.pet_id}">
                    ${pet.pet_name} - ${pet.owner_name}
                </option>`
            );

        });
    },

    error: function (xhr) {

        console.error(
            "Failed to load pets:",
            xhr.responseText
        );
    }
});

        loadPets();
        loadTreatments();
        loadAppointments();

});

$("#ownerForm").submit(function (event) {

    event.preventDefault();

    const name = $("#ownerName").val().trim();
const phone = $("#ownerPhone").val().trim();
const email = $("#ownerEmail").val().trim();

if (name === "") {
    $("#ownerMessage").text("Please enter owner name.");
    return;
}

if (phone === "") {
    $("#ownerMessage").text("Please enter phone number.");
    return;
}

const phonePattern = /^[0-9]{10}$/;

if (!phonePattern.test(phone)) {
    $("#ownerMessage").text("Phone number must contain 10 digits.");
    return;
}

if (email !== "") {

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
        $("#ownerMessage").text("Please enter a valid email.");
        return;
    }
}

    const ownerData = {
        name: $("#ownerName").val().trim(),
        phone: $("#ownerPhone").val().trim(),
        email: $("#ownerEmail").val().trim(),
        address: $("#ownerAddress").val().trim()
    };

    $.ajax({
        url: "/api/owners",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(ownerData),

        success: function (response) {

            $("#ownerMessage").text(response.message);

            $("#ownerForm")[0].reset();

            loadOwners();

            console.log("Owner added:", response);
        },

        error: function (xhr) {

            $("#ownerMessage").text("Failed to add owner.");

            console.error("Error:", xhr.responseText);
        }
    });

});

function deleteOwner(ownerId) {

    if (!confirm("Are you sure you want to delete this owner?")) {
        return;
    }

    $.ajax({
        url: "/api/owners/" + ownerId,
        method: "DELETE",

        success: function (response) {

            alert(response.message);

            location.reload();
        },

        error: function (xhr) {

            alert("Failed to delete owner.");

            console.error(xhr.responseText);
        }
    });
}

function editOwner(ownerId) {

    $.ajax({
        url: "/api/owners/" + ownerId,
        method: "GET",

        success: function (owner) {

            $("#editOwnerSection").show();

            $("#editOwnerId").val(owner.owner_id);
            $("#editOwnerName").val(owner.name);
            $("#editOwnerPhone").val(owner.phone);
            $("#editOwnerEmail").val(owner.email);
            $("#editOwnerAddress").val(owner.address);

            console.log("Owner loaded for editing:", owner);
        },

        error: function (xhr) {

            alert("Failed to load owner.");

            console.error(xhr.responseText);
        }
    });
}

$("#editOwnerForm").submit(function (event) {

    event.preventDefault();

    const ownerId = $("#editOwnerId").val();

    const updatedOwner = {
        name: $("#editOwnerName").val().trim(),
        phone: $("#editOwnerPhone").val().trim(),
        email: $("#editOwnerEmail").val().trim(),
        address: $("#editOwnerAddress").val().trim()
    };

    $.ajax({
        url: "/api/owners/" + ownerId,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedOwner),

        success: function (response) {

            $("#editOwnerMessage").text(response.message);

            alert(response.message);

            location.reload();
        },

        error: function (xhr) {

            $("#editOwnerMessage").text("Failed to update owner.");

            console.error(xhr.responseText);
        }
    });

});

// Add New Pet
$("#petForm").submit(function (event) {
    event.preventDefault();

    const ownerId = $("#petOwner").val();
    const petName = $("#petName").val().trim();
    const species = $("#petSpecies").val();
    const breed = $("#petBreed").val().trim();
    const age = $("#petAge").val();
    const gender = $("#petGender").val();

    // Validation
    if (ownerId === "") {
        $("#petMessage").text("Please select an owner.");
        return;
    }

    if (petName === "") {
        $("#petMessage").text("Please enter pet name.");
        return;
    }

    if (species === "") {
        $("#petMessage").text("Please select species.");
        return;
    }

    if (age !== "" && age < 0) {
        $("#petMessage").text("Age cannot be negative.");
        return;
    }

    const petData = {
        owner_id: ownerId,
        pet_name: petName,
        species: species,
        breed: breed,
        age: age,
        gender: gender
    };

    $.ajax({
        url: "/api/pets",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(petData),

        success: function (response) {

            $("#petMessage").text(
                response.message
            );

            $("#petForm")[0].reset();

            console.log("Pet added:", response);
        },

        error: function (xhr) {

            $("#petMessage").text(
                "Failed to add pet."
            );

            console.error(
                "Error:",
                xhr.responseText
            );
        }
    });
});

// Load Registered Pets
function loadPets() {

    $.ajax({
        url: "/api/pets",
        method: "GET",

        success: function (pets) {

            const tableBody = $("#petTableBody");

            tableBody.empty();

            pets.forEach(function (pet) {

                const row = `
                    <tr>
                        <td>${pet.pet_id}</td>
                        <td>${pet.pet_name}</td>
                        <td>${pet.species}</td>
                        <td>${pet.breed || ""}</td>
                        <td>${pet.age || ""}</td>
                        <td>${pet.gender || ""}</td>
                        <td>${pet.owner_name}</td>

                        <td>
                            <button class="edit-btn"
                                onclick="editPet(${pet.pet_id})">
                                Edit
                            </button>

                            <button class="delete-btn"
                                onclick="deletePet(${pet.pet_id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                tableBody.append(row);
            });
        },

        error: function (xhr) {
            console.error(
                "Failed to load pets:",
                xhr.responseText
            );
        }
    });
}

function editPet(petId) {

    $.ajax({
        url: "/api/pets/" + petId,
        method: "GET",

        success: function (pet) {

            $("#editPetSection").show();

            $("#editPetId").val(pet.pet_id);
            $("#editPetName").val(pet.pet_name);
            $("#editPetSpecies").val(pet.species);
            $("#editPetBreed").val(pet.breed);
            $("#editPetAge").val(pet.age);
            $("#editPetGender").val(pet.gender);

            // Load owners
            $.ajax({
                url: "/api/owners",
                method: "GET",

                success: function (owners) {

                    const ownerSelect = $("#editPetOwner");

                    ownerSelect.empty();

                    ownerSelect.append(
                        '<option value="">Select Owner</option>'
                    );

                    owners.forEach(function (owner) {

                        ownerSelect.append(
                            `<option value="${owner.owner_id}">
                                ${owner.name}
                            </option>`
                        );

                    });

                    // Select current owner
                    $("#editPetOwner").val(pet.owner_id);
                }
            });
        },

        error: function (xhr) {

            alert("Failed to load pet.");

            console.error(
                xhr.responseText
            );
        }
    });
}

$("#editPetForm").submit(function (event) {

    event.preventDefault();

    const petId = $("#editPetId").val();

    const updatedPet = {
        owner_id: $("#editPetOwner").val(),
        pet_name: $("#editPetName").val().trim(),
        species: $("#editPetSpecies").val(),
        breed: $("#editPetBreed").val().trim(),
        age: $("#editPetAge").val(),
        gender: $("#editPetGender").val()
    };

    // Validation
    if (updatedPet.owner_id === "") {
        $("#editPetMessage").text("Please select an owner.");
        return;
    }

    if (updatedPet.pet_name === "") {
        $("#editPetMessage").text("Please enter pet name.");
        return;
    }

    if (updatedPet.species === "") {
        $("#editPetMessage").text("Please select species.");
        return;
    }

    if (updatedPet.age !== "" && updatedPet.age < 0) {
        $("#editPetMessage").text("Age cannot be negative.");
        return;
    }

    $.ajax({
        url: "/api/pets/" + petId,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedPet),

        success: function (response) {

            $("#editPetMessage").text(
                response.message
            );

            loadPets();

            $("#editPetSection").hide();
        },

        error: function (xhr) {

            $("#editPetMessage").text(
                "Failed to update pet."
            );

            console.error(
                xhr.responseText
            );
        }
    });
});

function deletePet(petId) {

    if (!confirm("Are you sure you want to delete this pet?")) {
        return;
    }

    $.ajax({
        url: "/api/pets/" + petId,
        method: "DELETE",

        success: function (response) {

            alert(response.message);

            loadPets();
        },

        error: function (xhr) {

            alert("Failed to delete pet.");

            console.error(
                xhr.responseText
            );
        }
    });
}

$("#treatmentForm").submit(function (event) {

    event.preventDefault();

    const petId = $("#treatmentPet").val();
    const treatmentName = $("#treatmentName").val().trim();
    const description = $("#treatmentDescription").val().trim();
    const treatmentDate = $("#treatmentDate").val();
    const cost = $("#treatmentCost").val();

    // Validation
    if (petId === "") {
        $("#treatmentMessage").text("Please select a pet.");
        return;
    }

    if (treatmentName === "") {
        $("#treatmentMessage").text("Please enter treatment name.");
        return;
    }

    if (treatmentDate === "") {
        $("#treatmentMessage").text("Please select treatment date.");
        return;
    }

    if (cost !== "" && cost < 0) {
        $("#treatmentMessage").text("Cost cannot be negative.");
        return;
    }

    const treatmentData = {
        pet_id: petId,
        treatment_name: treatmentName,
        description: description,
        treatment_date: treatmentDate,
        cost: cost
    };

    $.ajax({
        url: "/api/treatments",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(treatmentData),

        success: function (response) {

            $("#treatmentMessage").text(
                response.message
            );

            $("#treatmentForm")[0].reset();

            console.log(
                "Treatment added:",
                response
            );
        },

        error: function (xhr) {

            $("#treatmentMessage").text(
                "Failed to add treatment."
            );

            console.error(
                xhr.responseText
            );
        }
    });
});

// Load Registered Treatments
function loadTreatments() {

    $.ajax({
        url: "/api/treatments",
        method: "GET",

        success: function (treatments) {

            const tableBody = $("#treatmentTableBody");

            tableBody.empty();

            treatments.forEach(function (treatment) {

                const row = `
                    <tr>
                        <td>${treatment.treatment_id}</td>
                        <td>${treatment.pet_name}</td>
                        <td>${treatment.treatment_name}</td>
                        <td>${treatment.description || ""}</td>
                        <td>${treatment.treatment_date}</td>
                        <td>${treatment.cost || ""}</td>

                        <td>
                            <button class="edit-btn"
                                onclick="editTreatment(${treatment.treatment_id})">
                                Edit
                            </button>

                            <button class="delete-btn"
                                onclick="deleteTreatment(${treatment.treatment_id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                tableBody.append(row);
            });
        },

        error: function (xhr) {

            console.error(
                "Failed to load treatments:",
                xhr.responseText
            );
        }
    });
}

function editTreatment(treatmentId) {

    $.ajax({
        url: "/api/treatments/" + treatmentId,
        method: "GET",

        success: function (treatment) {

            $("#editTreatmentSection").show();

            $("#editTreatmentId").val(treatment.treatment_id);
            $("#editTreatmentName").val(treatment.treatment_name);
            $("#editTreatmentDescription").val(treatment.description);
            $("#editTreatmentDate").val(treatment.treatment_date);
            $("#editTreatmentCost").val(treatment.cost);

            // Load pets into edit dropdown
            $.ajax({
                url: "/api/pets",
                method: "GET",

                success: function (pets) {

                    const petSelect = $("#editTreatmentPet");

                    petSelect.empty();

                    petSelect.append(
                        '<option value="">Select Pet</option>'
                    );

                    pets.forEach(function (pet) {

                        petSelect.append(
                            `<option value="${pet.pet_id}">
                                ${pet.pet_name} - ${pet.owner_name}
                            </option>`
                        );

                    });

                    // Select current pet
                    $("#editTreatmentPet").val(treatment.pet_id);
                },

                error: function (xhr) {

                    console.error(
                        "Failed to load pets:",
                        xhr.responseText
                    );
                }
            });
        },

        error: function (xhr) {

            alert("Failed to load treatment.");

            console.error(
                xhr.responseText
            );
        }
    });
}

$("#editTreatmentForm").submit(function (event) {

    event.preventDefault();

    const treatmentId = $("#editTreatmentId").val();

    const updatedTreatment = {
        pet_id: $("#editTreatmentPet").val(),
        treatment_name: $("#editTreatmentName").val().trim(),
        description: $("#editTreatmentDescription").val().trim(),
        treatment_date: $("#editTreatmentDate").val(),
        cost: $("#editTreatmentCost").val()
    };

    // Validation
    if (updatedTreatment.pet_id === "") {
        $("#editTreatmentMessage").text(
            "Please select a pet."
        );
        return;
    }

    if (updatedTreatment.treatment_name === "") {
        $("#editTreatmentMessage").text(
            "Please enter treatment name."
        );
        return;
    }

    if (updatedTreatment.treatment_date === "") {
        $("#editTreatmentMessage").text(
            "Please select treatment date."
        );
        return;
    }

    if (
        updatedTreatment.cost !== "" &&
        updatedTreatment.cost < 0
    ) {
        $("#editTreatmentMessage").text(
            "Cost cannot be negative."
        );
        return;
    }

    $.ajax({
        url: "/api/treatments/" + treatmentId,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedTreatment),

        success: function (response) {

            $("#editTreatmentMessage").text(
                response.message
            );

            loadTreatments();

            $("#editTreatmentSection").hide();
        },

        error: function (xhr) {

            $("#editTreatmentMessage").text(
                "Failed to update treatment."
            );

            console.error(
                xhr.responseText
            );
        }
    });
});

function deleteTreatment(treatmentId) {

    if (!confirm("Are you sure you want to delete this treatment?")) {
        return;
    }

    $.ajax({
        url: "/api/treatments/" + treatmentId,
        method: "DELETE",

        success: function (response) {

            alert(response.message);

            loadTreatments();
        },

        error: function (xhr) {

            alert("Failed to delete treatment.");

            console.error(
                xhr.responseText
            );
        }
    });
}

$("#appointmentForm").submit(function (event) {

    event.preventDefault();

    const petId = $("#appointmentPet").val();
    const appointmentDate = $("#appointmentDate").val();
    const appointmentTime = $("#appointmentTime").val();
    const reason = $("#appointmentReason").val().trim();
    const status = $("#appointmentStatus").val();

    // Validation
    if (petId === "") {
        $("#appointmentMessage").text("Please select a pet.");
        return;
    }

    if (appointmentDate === "") {
        $("#appointmentMessage").text("Please select appointment date.");
        return;
    }

    if (appointmentTime === "") {
        $("#appointmentMessage").text("Please select appointment time.");
        return;
    }

    const appointmentData = {
        pet_id: petId,
        appointment_date: appointmentDate,
        appointment_time: appointmentTime,
        reason: reason,
        status: status
    };

    $.ajax({
        url: "/api/appointments",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(appointmentData),

        success: function (response) {

            $("#appointmentMessage").text(
                response.message
            );

            $("#appointmentForm")[0].reset();

            console.log(
                "Appointment added:",
                response
            );
        },

        error: function (xhr) {

            $("#appointmentMessage").text(
                "Failed to add appointment."
            );

            console.error(
                xhr.responseText
            );
        }
    });
});

function loadAppointments() {
    $.ajax({
        url: "/api/appointments",
        method: "GET",

        success: function (appointments) {

            const tableBody = $("#appointmentTableBody");

            tableBody.empty();

            appointments.forEach(function (appointment) {

                const row = `
                    <tr>
                        <td>${appointment.appointment_id}</td>
                        <td>${appointment.pet_name}</td>
                        <td>${appointment.appointment_date}</td>
                        <td>${appointment.appointment_time}</td>
                        <td>${appointment.reason || ""}</td>
                        <td>${appointment.status}</td>

                        <td>
                            <button class="edit-btn"
                                onclick="editAppointment(${appointment.appointment_id})">
                                Edit
                            </button>

                            <button class="delete-btn"
                                onclick="deleteAppointment(${appointment.appointment_id})">
                                Delete
                            </button>
                        </td>
                    </tr>
                `;

                tableBody.append(row);
            });
        },

        error: function (xhr) {
            console.error(
                "Failed to load appointments:",
                xhr.responseText
            );
        }
    });
}
function editAppointment(appointmentId) {

    $.ajax({
        url: "/api/appointments/" + appointmentId,
        method: "GET",

        success: function (appointment) {

            $("#editAppointmentSection").show();

            $("#editAppointmentId").val(appointment.appointment_id);
            $("#editAppointmentDate").val(appointment.appointment_date);
            $("#editAppointmentTime").val(appointment.appointment_time);
            $("#editAppointmentReason").val(appointment.reason);
            $("#editAppointmentStatus").val(appointment.status);

            // Load pets into edit dropdown
            $.ajax({
                url: "/api/pets",
                method: "GET",

                success: function (pets) {

                    const petSelect = $("#editAppointmentPet");

                    petSelect.empty();

                    petSelect.append(
                        '<option value="">Select Pet</option>'
                    );

                    pets.forEach(function (pet) {

                        petSelect.append(
                            `<option value="${pet.pet_id}">
                                ${pet.pet_name} - ${pet.owner_name}
                            </option>`
                        );

                    });

                    // Select current pet
                    $("#editAppointmentPet").val(appointment.pet_id);
                },

                error: function (xhr) {

                    console.error(
                        "Failed to load pets:",
                        xhr.responseText
                    );
                }
            });
        },

        error: function (xhr) {

            alert("Failed to load appointment.");

            console.error(
                xhr.responseText
            );
        }
    });
}

$("#editAppointmentForm").submit(function (event) {

    event.preventDefault();

    const appointmentId = $("#editAppointmentId").val();

    const updatedAppointment = {
        pet_id: $("#editAppointmentPet").val(),
        appointment_date: $("#editAppointmentDate").val(),
        appointment_time: $("#editAppointmentTime").val(),
        reason: $("#editAppointmentReason").val().trim(),
        status: $("#editAppointmentStatus").val()
    };

    // Validation
    if (updatedAppointment.pet_id === "") {
        $("#editAppointmentMessage").text(
            "Please select a pet."
        );
        return;
    }

    if (updatedAppointment.appointment_date === "") {
        $("#editAppointmentMessage").text(
            "Please select appointment date."
        );
        return;
    }

    if (updatedAppointment.appointment_time === "") {
        $("#editAppointmentMessage").text(
            "Please select appointment time."
        );
        return;
    }

    $.ajax({
        url: "/api/appointments/" + appointmentId,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(updatedAppointment),

        success: function (response) {

            $("#editAppointmentMessage").text(
                response.message
            );

            loadAppointments();

            $("#editAppointmentSection").hide();
        },

        error: function (xhr) {

            $("#editAppointmentMessage").text(
                "Failed to update appointment."
            );

            console.error(
                xhr.responseText
            );
        }
    });
});

function deleteAppointment(appointmentId) {

    if (!confirm("Are you sure you want to delete this appointment?")) {
        return;
    }

    $.ajax({
        url: "/api/appointments/" + appointmentId,
        method: "DELETE",

        success: function (response) {

            alert(response.message);

            loadAppointments();
        },

        error: function (xhr) {

            alert("Failed to delete appointment.");

            console.error(
                xhr.responseText
            );
        }
    });
}

$("#ownerSearch").on("keyup", function () {

    const searchText = $(this).val().toLowerCase();

    $("#ownerTableBody tr").each(function () {

        const rowText = $(this).text().toLowerCase();

        if (rowText.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

});

$("#petSearch").on("keyup", function () {

    const searchText = $(this).val().toLowerCase();

    $("#petTableBody tr").each(function () {

        const rowText = $(this).text().toLowerCase();

        if (rowText.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

});

$("#treatmentSearch").on("keyup", function () {

    const searchText = $(this).val().toLowerCase();

    $("#treatmentTableBody tr").each(function () {

        const rowText = $(this).text().toLowerCase();

        if (rowText.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

});

$("#appointmentSearch").on("keyup", function () {

    const searchText = $(this).val().toLowerCase();

    $("#appointmentTableBody tr").each(function () {

        const rowText = $(this).text().toLowerCase();

        if (rowText.includes(searchText)) {
            $(this).show();
        } else {
            $(this).hide();
        }

    });

});

// Load Dashboard Statistics
function loadDashboardStats() {
    $.ajax({
        url: "/api/dashboard",
        method: "GET",
        xhrFields: { withCredentials: true },

        success: function (data) {
            $("#totalOwners").text(data.totalOwners || 0);
            $("#totalPets").text(data.totalPets || 0);
            $("#totalTreatments").text(data.totalTreatments || 0);
            $("#totalAppointments").text(data.totalAppointments || 0);
            $("#totalVaccinations").text(data.totalVaccinations || 0);
            $("#totalPayments").text(data.totalPayments || 0);
        },

        error: function (xhr) {
            console.error(
                "Failed to load dashboard statistics:",
                xhr.responseText
            );
        }
    });
}

// Run when the page loads
$(document).ready(function () {
    loadDashboardStats();
    loadOwners();
});

// ===============================
// VACCINATION MANAGEMENT
// ===============================

// Load pets into vaccination dropdowns
function loadVaccinationPets() {
    $.ajax({
        url: "/api/pets",
        method: "GET",

        success: function (pets) {
            const selects = [
                $("#vaccinationPet"),
                $("#editVaccinationPet")
            ];

            selects.forEach(function (select) {
                select.empty();
                select.append('<option value="">Select Pet</option>');

                pets.forEach(function (pet) {
                    const option = $("<option></option>")
                        .val(pet.pet_id)
                        .text(pet.pet_name);

                    select.append(option);
                });
            });
        },

        error: function (xhr) {
            console.error("Failed to load pets:", xhr.responseText);
        }
    });
}


// Load all vaccination records
function loadVaccinations() {
    $.ajax({
        url: "/api/vaccinations",
        method: "GET",
        xhrFields: { withCredentials: true },

        success: function (vaccinations) {
            const tableBody = $("#vaccinationTableBody");
            tableBody.empty();

            vaccinations.forEach(function (vaccination) {
                const row = $("<tr></tr>");

                [
                    vaccination.vaccination_id,
                    vaccination.pet_name,
                    vaccination.vaccine_name,
                    vaccination.vaccination_date ? String(vaccination.vaccination_date).substring(0, 10) : "-",
                    vaccination.next_due_date ? String(vaccination.next_due_date).substring(0, 10) : "-",
                    vaccination.notes || "-"
                ].forEach(function (value) {
                    $("<td></td>")
                        .text(value == null ? "" : value)
                        .appendTo(row);
                });

                const actions = $("<td></td>");

                $("<button></button>")
                    .addClass("edit-btn")
                    .text("Edit")
                    .on("click", function () {
                        editVaccination(vaccination.vaccination_id);
                    })
                    .appendTo(actions);

                actions.append(" ");

                $("<button></button>")
                    .addClass("delete-btn")
                    .text("Delete")
                    .on("click", function () {
                        deleteVaccination(vaccination.vaccination_id);
                    })
                    .appendTo(actions);

                row.append(actions);
                tableBody.append(row);
            });

            filterVaccinations();
        },

        error: function (xhr) {
            console.error(
                "Failed to load vaccinations:",
                xhr.responseText
            );
        }
    });
}


// Add a vaccination
$("#vaccinationForm").on("submit", function (event) {
    event.preventDefault();

    const vaccination = {
        pet_id: $("#vaccinationPet").val(),
        vaccine_name: $("#vaccineName").val().trim(),
        vaccination_date: $("#vaccinationDate").val(),
        next_due_date: $("#nextDueDate").val() || null,
        notes: $("#vaccinationNotes").val().trim()
    };

    if (!vaccination.pet_id ||
        !vaccination.vaccine_name ||
        !vaccination.vaccination_date) {

        $("#vaccinationMessage").text(
            "Please fill in all required fields."
        );
        return;
    }

    $.ajax({
        url: "/api/vaccinations",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(vaccination),

        success: function (response) {
            $("#vaccinationMessage").text(response.message);
            $("#vaccinationForm")[0].reset();

            loadVaccinations();
        },

        error: function (xhr) {
            $("#vaccinationMessage").text(
                xhr.responseJSON?.message ||
                "Failed to add vaccination. Please log in again."
            );
        }
    });
});


// Load one vaccination for editing
function editVaccination(id) {
    $.ajax({
        url: "/api/vaccinations/" + id,
        method: "GET",

        success: function (vaccination) {
            $("#editVaccinationId").val(vaccination.vaccination_id);
            $("#editVaccineName").val(vaccination.vaccine_name);
            $("#editVaccinationDate").val(
                String(vaccination.vaccination_date).substring(0, 10)
            );
            $("#editNextDueDate").val(
                vaccination.next_due_date
                    ? String(vaccination.next_due_date).substring(0, 10)
                    : ""
            );
            $("#editVaccinationNotes").val(vaccination.notes || "");

            $("#editVaccinationPet").val(vaccination.pet_id);

            $("#editVaccinationSection").show();

            document.getElementById("editVaccinationSection")
                .scrollIntoView({ behavior: "smooth" });
        },

        error: function (xhr) {
            alert(
                xhr.responseJSON?.message ||
                "Failed to load vaccination."
            );
        }
    });
}


// Update vaccination
$("#editVaccinationForm").on("submit", function (event) {
    event.preventDefault();

    const id = $("#editVaccinationId").val();

    const vaccination = {
        pet_id: $("#editVaccinationPet").val(),
        vaccine_name: $("#editVaccineName").val().trim(),
        vaccination_date: $("#editVaccinationDate").val(),
        next_due_date: $("#editNextDueDate").val() || null,
        notes: $("#editVaccinationNotes").val().trim()
    };

    if (!vaccination.pet_id ||
        !vaccination.vaccine_name ||
        !vaccination.vaccination_date) {

        $("#editVaccinationMessage").text(
            "Please fill in all required fields."
        );
        return;
    }

    $.ajax({
        url: "/api/vaccinations/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(vaccination),

        success: function (response) {
            $("#editVaccinationMessage").text(response.message);

            $("#editVaccinationForm")[0].reset();
            $("#editVaccinationSection").hide();

            loadVaccinations();
        },

        error: function (xhr) {
            $("#editVaccinationMessage").text(
                xhr.responseJSON?.message ||
                "Failed to update vaccination."
            );
        }
    });
});


// Delete vaccination
function deleteVaccination(id) {
    if (!confirm("Are you sure you want to delete this vaccination?")) {
        return;
    }

    $.ajax({
        url: "/api/vaccinations/" + id,
        method: "DELETE",

        success: function (response) {
            alert(response.message);
            loadVaccinations();
        },

        error: function (xhr) {
            alert(
                xhr.responseJSON?.message ||
                "Failed to delete vaccination."
            );
        }
    });
}


// Search vaccinations
$("#vaccinationSearch").on("input", function () {
    filterVaccinations();
});

function filterVaccinations() {
    const searchText = $("#vaccinationSearch").val().toLowerCase();

    $("#vaccinationTableBody tr").each(function () {
        const rowText = $(this).text().toLowerCase();

        $(this).toggle(rowText.includes(searchText));
    });
}


// Cancel edit
$("#cancelVaccinationEdit").on("click", function () {
    $("#editVaccinationForm")[0].reset();
    $("#editVaccinationSection").hide();
});


// Initialize vaccination module
$(document).ready(function () {
    loadVaccinationPets();
    loadVaccinations();
});

// ===============================
// PAYMENT MANAGEMENT
// ===============================

// Load owners into dropdowns
function loadPaymentOwners() {
    $.ajax({
        url: "/api/owners",
        method: "GET",

        success: function (owners) {
            const selects = [
                $("#paymentOwner"),
                $("#editPaymentOwner")
            ];

            selects.forEach(function (select) {
                select.empty();
                select.append('<option value="">Select Owner</option>');

                owners.forEach(function (owner) {
                    $("<option></option>")
                        .val(owner.owner_id)
                        .text(owner.name)
                        .appendTo(select);
                });
            });
        },

        error: function (xhr) {
            console.error("Failed to load owners:", xhr.responseText);
        }
    });
}


// Load payments
function loadPayments() {
    $.ajax({
        url: "/api/payments",
        method: "GET",
        xhrFields: { withCredentials: true },

        success: function (payments) {
            const tbody = $("#paymentTableBody");
            tbody.empty();

            payments.forEach(function (payment) {
                const row = $("<tr></tr>");

                const values = [
                    payment.payment_id,
                    payment.owner_name,
                    Number(payment.amount).toFixed(2),
                    payment.payment_method,
                    payment.payment_status,
                    String(payment.payment_date).substring(0, 10),
                    payment.description || "-"
                ];

                values.forEach(function (value) {
                    $("<td></td>")
                        .text(value == null ? "" : value)
                        .appendTo(row);
                });

                const actions = $("<td></td>");

                $("<button type='button'>Edit</button>")
                    .addClass("edit-btn")
                    .on("click", function () {
                        editPayment(payment.payment_id);
                    })
                    .appendTo(actions);

                actions.append(" ");

                $("<button type='button'>Delete</button>")
                    .addClass("delete-btn")
                    .on("click", function () {
                        deletePayment(payment.payment_id);
                    })
                    .appendTo(actions);

                row.append(actions);
                tbody.append(row);
            });

            filterPayments();
        },

        error: function (xhr) {
            console.error("Failed to load payments:", xhr.responseText);
        }
    });
}


// Add payment
$("#paymentForm").on("submit", function (event) {
    event.preventDefault();

    const payment = {
        owner_id: $("#paymentOwner").val(),
        amount: $("#paymentAmount").val(),
        payment_method: $("#paymentMethod").val(),
        payment_status: $("#paymentStatus").val(),
        payment_date: $("#paymentDate").val(),
        description: $("#paymentDescription").val().trim()
    };

    if (
        !payment.owner_id ||
        !payment.amount ||
        Number(payment.amount) <= 0 ||
        !payment.payment_method ||
        !payment.payment_date
    ) {
        $("#paymentMessage").text("Please enter valid payment details.");
        return;
    }

    $.ajax({
        url: "/api/payments",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(payment),

        success: function (response) {
            $("#paymentMessage").text(response.message);
            $("#paymentForm")[0].reset();
            loadPayments();
        },

        error: function (xhr) {
            $("#paymentMessage").text(
                xhr.responseJSON?.message ||
                "Failed to save payment. Check your login session."
            );
        }
    });
});


// Edit payment
function editPayment(id) {
    $.ajax({
        url: "/api/payments/" + id,
        method: "GET",

        success: function (payment) {
            $("#editPaymentId").val(payment.payment_id);
            $("#editPaymentOwner").val(payment.owner_id);
            $("#editPaymentAmount").val(payment.amount);
            $("#editPaymentMethod").val(payment.payment_method);
            $("#editPaymentStatus").val(payment.payment_status);
            $("#editPaymentDate").val(
                String(payment.payment_date).substring(0, 10)
            );
            $("#editPaymentDescription").val(payment.description || "");

            $("#editPaymentSection").show();

            document.getElementById("editPaymentSection")
                .scrollIntoView({ behavior: "smooth" });
        },

        error: function (xhr) {
            alert(xhr.responseJSON?.message || "Failed to load payment.");
        }
    });
}


// Update payment
$("#editPaymentForm").on("submit", function (event) {
    event.preventDefault();

    const id = $("#editPaymentId").val();

    const payment = {
        owner_id: $("#editPaymentOwner").val(),
        amount: $("#editPaymentAmount").val(),
        payment_method: $("#editPaymentMethod").val(),
        payment_status: $("#editPaymentStatus").val(),
        payment_date: $("#editPaymentDate").val(),
        description: $("#editPaymentDescription").val().trim()
    };

    if (
        !payment.owner_id ||
        !payment.amount ||
        Number(payment.amount) <= 0 ||
        !payment.payment_method ||
        !payment.payment_date
    ) {
        $("#editPaymentMessage").text("Please enter valid payment details.");
        return;
    }

    $.ajax({
        url: "/api/payments/" + id,
        method: "PUT",
        contentType: "application/json",
        data: JSON.stringify(payment),

        success: function (response) {
            $("#editPaymentMessage").text(response.message);
            $("#editPaymentForm")[0].reset();
            $("#editPaymentSection").hide();
            loadPayments();
        },

        error: function (xhr) {
            $("#editPaymentMessage").text(
                xhr.responseJSON?.message ||
                "Failed to update payment."
            );
        }
    });
});


// Delete payment
function deletePayment(id) {
    if (!confirm("Delete this payment record?")) {
        return;
    }

    $.ajax({
        url: "/api/payments/" + id,
        method: "DELETE",

        success: function (response) {
            alert(response.message);
            loadPayments();
        },

        error: function (xhr) {
            alert(xhr.responseJSON?.message || "Failed to delete payment.");
        }
    });
}


// Search payments
$("#paymentSearch").on("input", function () {
    filterPayments();
});


function filterPayments() {
    const query = $("#paymentSearch").val().toLowerCase();

    $("#paymentTableBody tr").each(function () {
        $(this).toggle($(this).text().toLowerCase().includes(query));
    });
}


// Cancel edit
$("#cancelPaymentEdit").on("click", function () {
    $("#editPaymentForm")[0].reset();
    $("#editPaymentSection").hide();
});


// Initialize payment module
$(document).ready(function () {
    loadPaymentOwners();
    loadPayments();
});
        });