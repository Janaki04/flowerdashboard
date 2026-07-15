import React, { useState } from 'react';
import { 
  Plus, Search, SlidersHorizontal, ChevronDown, MoreVertical, 
  ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, X, Camera 
} from 'lucide-react';

export default function ContactsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [activeProfileId, setActiveProfileId] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [address, setAddress] = useState('');
  const [dobDay, setDobDay] = useState('17');
  const [dobMonth, setDobMonth] = useState('March');
  const [dobYear, setDobYear] = useState('1995');
  const [notes, setNotes] = useState('');

  const [contacts, setContacts] = useState([
    { id: 1, name: "Regina", role: "Manager", email: "cooper@example.com", location: "Sochi, Russia", phone: "+1123-4567", avatar: "RC", dob: "17 March, 1995" },
    { id: 2, name: "Judith", role: "Creative Director", email: "black@example.com", location: "New York, USA", phone: "+1 (070) 123-8459", avatar: "JB", dob: "24 October, 1992" },
    { id: 3, name: "Ronald", role: "Manager", email: "robe@example.com", location: "Paris, France", phone: "+1 (070) 123-9221", avatar: "RR", dob: "03 January, 1988" },
    { id: 4, name: "Dustin", role: "Designer", email: "williams@example.com", location: "Sydney, Australia", phone: "+1 (070) 123-0507", avatar: "DW", dob: "11 July, 1994" },
    { id: 5, name: "Calvin", role: "Manager", email: "flores@example.com", location: "Berlin, Germany", phone: "+1 (070) 123-3791", avatar: "CF", dob: "19 September, 1990" },
    { id: 6, name: "Robert", role: "Developer", email: "edwards@example.com", location: "Shanghai, China", phone: "+1 (070) 123-1147", avatar: "RE", dob: "08 April, 1993" },
    { id: 7, name: "Colleen", role: "Manager", email: "warren@example.com", location: "Ottawa, Canada", phone: "+1 (070) 123-9127", avatar: "CW", dob: "30 December, 1986" },
    { id: 8, name: "Nathan", role: "Designer", email: "fox@example.com", location: "London, UK", phone: "+1 (070) 123-5073", avatar: "NF", dob: "14 February, 1991" },
    { id: 9, name: "Bessie", role: "Developer", email: "henry@example.com", location: "New York, USA", phone: "+1 (070) 123-3578", avatar: "BH", dob: "22 May, 1997" },
    { id: 10, name: "Philip", role: "Manager", email: "mccoy@example.com", location: "Sydney, Australia", phone: "+1 (070) 123-4588", avatar: "PM", dob: "05 August, 1989" }
  ]);

  const favorites = [
    { name: "Ronald Robertson", role: "Product Designer", avatar: "RR" },
    { name: "Regina Cooper", role: "Project Manager", avatar: "RC" }
  ];

  const currentProfile = contacts.find(c => c.id === activeProfileId) || contacts[0];

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedContacts(contacts.map(c => c.id));
    } else {
      setSelectedContacts([]);
    }
  };

  const handleSelectContact = (id) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(item => item !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  const handleCreateContact = (e) => {
    e.preventDefault();
    if (!firstName || !lastName) return;

    const newContact = {
      id: Date.now(),
      name: `${firstName} ${lastName}`,
      role: jobTitle || "Contributor",
      email: email || "no-email@example.com",
      location: address || "Unknown",
      phone: phone ? `+1 ${phone}` : "+1 (070) 000-0000",
      avatar: `${firstName[0]}${lastName[0]}`.toUpperCase(),
      dob: `${dobDay} ${dobMonth}, ${dobYear}`
    };

    setContacts([newContact, ...contacts]);
    setActiveProfileId(newContact.id);
    
    setFirstName('');
    setLastName('');
    setEmail('');
    setPhone('');
    setJobTitle('');
    setAddress('');
    setNotes('');
    setIsModalOpen(false);
  };

  const filteredContacts = contacts.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full bg-[#f8fafc] min-h-screen">
      
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Contacts</h1>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#1b873a] hover:bg-[#14662b] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
        >
          <Plus size={18} />
          <span>Add Contact</span>
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-6 items-start">
        
        <div className="flex-1 w-full bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          
          <div className="p-4 border-b border-gray-50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input 
                type="text" 
                placeholder="Search contact..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-[#f8fafc] text-sm border border-transparent focus:border-gray-200 rounded-xl outline-none transition-colors"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  <th className="py-4 px-6 w-12 text-center">
                    <input 
                      type="checkbox" 
                      onChange={handleSelectAll}
                      checked={selectedContacts.length === contacts.length && contacts.length > 0}
                      className="rounded border-gray-300 text-[#1b873a] focus:ring-[#1b873a] w-4 h-4 cursor-pointer"
                    />
                  </th>
                  <th className="py-4 px-4 font-semibold text-gray-400">Name</th>
                  <th className="py-4 px-4 font-semibold text-gray-400 hidden md:table-cell">Email</th>
                  <th className="py-4 px-4 font-semibold text-gray-400 hidden lg:table-cell">Location</th>
                  <th className="py-4 px-4 font-semibold text-gray-400 hidden sm:table-cell">Phone</th>
                  <th className="py-4 px-6 w-12"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredContacts.map((contact) => (
                  <tr 
                    key={contact.id}
                    onClick={() => setActiveProfileId(contact.id)}
                    className={`group cursor-pointer hover:bg-gray-50/50 transition-colors ${activeProfileId === contact.id ? 'bg-gray-50/70' : ''}`}
                  >
                    <td className="py-4 px-6 text-center" onClick={(e) => e.stopPropagation()}>
                      <input 
                        type="checkbox" 
                        checked={selectedContacts.includes(contact.id)}
                        onChange={() => handleSelectContact(contact.id)}
                        className="rounded border-gray-300 text-[#1b873a] focus:ring-[#1b873a] w-4 h-4 cursor-pointer"
                      />
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-sm shrink-0">
                          {contact.avatar}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-gray-800 leading-tight group-hover:text-[#1b873a] transition-colors">{contact.name}</h4>
                          <span className="text-xs text-gray-400 font-medium">{contact.role}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 font-medium hidden md:table-cell">
                      {contact.email}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 font-medium hidden lg:table-cell">
                      {contact.location}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-500 font-medium hidden sm:table-cell">
                      {contact.phone}
                    </td>
                    <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                      <button className="p-1.5 hover:bg-white rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white">
            <div className="flex items-center gap-3 text-xs text-gray-500 font-medium">
              <div className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-xl bg-white shadow-xs cursor-pointer">
                <span>10</span>
                <ChevronDown size={12} />
              </div>
              <span>Showing 1 – 10 of 100</span>
            </div>

            <div className="flex items-center gap-1.5">
              <button className="p-2 border border-gray-100 bg-white rounded-xl text-gray-300 cursor-not-allowed"><ChevronsLeft size={14} /></button>
              <button className="p-2 border border-gray-100 bg-white rounded-xl text-gray-300 cursor-not-allowed"><ChevronLeft size={14} /></button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#1b873a] text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 text-xs font-semibold">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 text-xs font-semibold">3</button>
              <span className="text-xs text-gray-400 px-1">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-xl hover:bg-gray-50 text-gray-600 text-xs font-semibold">5</button>
              <button className="p-2 border border-gray-100 bg-white rounded-xl text-gray-500 hover:bg-gray-50"><ChevronRight size={14} /></button>
              <button className="p-2 border border-gray-100 bg-white rounded-xl text-gray-500 hover:bg-gray-50"><ChevronsRight size={14} /></button>
            </div>
          </div>

        </div>
        <div className="w-full xl:w-80 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm flex flex-col shrink-0">
          <div className="flex flex-col items-center text-center pb-6 border-b border-gray-100">
            <div className="relative w-28 h-28 mb-4">
              <div className="w-full h-full rounded-full bg-[#3cc49b]/15 flex items-center justify-center text-3xl font-extrabold text-[#115b4c] border-2 border-[#3cc49b]/35">
                {currentProfile.avatar}
              </div>
              <span className="absolute bottom-1 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
            </div>
            
            <h2 className="text-xl font-extrabold text-gray-800 tracking-tight leading-tight">
              {currentProfile.name.split(' ')[0]} <span className="font-medium text-gray-500">{currentProfile.name.split(' ')[1]}</span>
            </h2>
            <p className="text-xs text-gray-400 font-semibold mt-1">{currentProfile.role}</p>
          </div>
          <div className="py-6 space-y-4 border-b border-gray-100">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-3">Info</h4>
            
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Email</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5 truncate">{currentProfile.email}</p>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Phone</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{currentProfile.phone}</p>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Birthday</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{currentProfile.dob}</p>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Location</label>
              <p className="text-xs font-semibold text-gray-700 mt-0.5">{currentProfile.location}</p>
            </div>
          </div>
          <div className="pt-6">
            <h4 className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-4">Favorites</h4>
            
            <div className="space-y-3">
              {favorites.map((fav, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-100 text-orange-700 flex items-center justify-center font-bold text-xs">
                    {fav.avatar}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-gray-800 leading-none">{fav.name}</h5>
                    <span className="text-[10px] text-gray-400 font-medium">{fav.role}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Mask shadow panel */}
          <div className="absolute inset-0 bg-black/40 backdrop-blur-xs" onClick={() => setIsModalOpen(false)} />
          
          <div className="relative bg-white w-full max-w-[520px] rounded-3xl p-6 shadow-2xl border border-gray-100 animate-in fade-in zoom-in-95 duration-150 flex flex-col max-h-[90vh] overflow-hidden">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-50">
              <h2 className="text-2xl font-bold text-gray-800">New Contact</h2>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleCreateContact} className="flex-1 overflow-y-auto py-4 space-y-4 pr-1">
              <div className="flex justify-center pb-2">
                <div className="w-24 h-24 rounded-full border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-[#1b873a] hover:text-[#1b873a] transition-colors cursor-pointer bg-[#fdfdfd]">
                  <Camera size={24} className="stroke-[1.6] mb-1" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">Add Photo</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">First Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Regina"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-gray-300 bg-[#fbfbfb]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-400">Last Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="Cooper"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-gray-300 bg-[#fbfbfb]"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">Email</label>
                <input 
                  type="email" 
                  placeholder="cooper@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-gray-300 bg-[#fbfbfb]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">Phone</label>
                <div className="flex border border-gray-200 rounded-xl overflow-hidden focus-within:border-gray-300 transition-colors bg-[#fbfbfb]">
                  <div className="flex items-center gap-1.5 px-3.5 bg-gray-50 border-r border-gray-100 text-sm font-semibold text-gray-600">
                    <span>+1</span>
                    <ChevronDown size={12} />
                  </div>
                  <input 
                    type="text" 
                    placeholder="(070) 123-4567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 border-0 text-sm font-semibold text-gray-700 outline-none focus:ring-0 bg-transparent"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">Job Title</label>
                <input 
                  type="text" 
                  placeholder="Manager"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-gray-300 bg-[#fbfbfb]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">Address</label>
                <input 
                  type="text" 
                  placeholder="Sochi, Russia"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-gray-300 bg-[#fbfbfb]"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">Date of Birth</label>
                <div className="grid grid-cols-3 gap-3">
                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-xl bg-[#fbfbfb]">
                    <select value={dobDay} onChange={(e) => setDobDay(e.target.value)} className="w-full bg-transparent text-sm font-semibold text-gray-700 border-none outline-none focus:ring-0 cursor-pointer appearance-none">
                      {[...Array(31)].map((_, i) => (
                        <option key={i+1} value={i+1}>{i+1}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="text-gray-400 pointer-events-none" />
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-xl bg-[#fbfbfb]">
                    <select value={dobMonth} onChange={(e) => setDobMonth(e.target.value)} className="w-full bg-transparent text-sm font-semibold text-gray-700 border-none outline-none focus:ring-0 cursor-pointer appearance-none">
                      {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((month) => (
                        <option key={month} value={month}>{month}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="text-gray-400 pointer-events-none" />
                  </div>

                  <div className="flex items-center justify-between px-3 py-2 border border-gray-200 rounded-xl bg-[#fbfbfb]">
                    <select value={dobYear} onChange={(e) => setDobYear(e.target.value)} className="w-full bg-transparent text-sm font-semibold text-gray-700 border-none outline-none focus:ring-0 cursor-pointer appearance-none">
                      {Array.from({ length: 50 }, (_, i) => 2010 - i).map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                    <ChevronDown size={14} className="text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-400">Notes</label>
                <textarea 
                  rows={3}
                  placeholder="Type something"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full p-3 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 outline-none focus:border-gray-300 resize-none bg-[#fbfbfb]"
                />
              </div>
              <div className="flex justify-end pt-3 border-t border-gray-50">
                <button 
                  type="submit"
                  className="px-6 py-2.5 bg-[#1b873a] hover:bg-[#14662b] text-white text-sm font-semibold rounded-xl transition-colors shadow-xs"
                >
                  Add Contact
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
}