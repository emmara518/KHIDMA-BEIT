import React from 'react';
import {
  Home,
  Building2,
  Armchair,
  Layers,
  Droplets,
  Wind,
  ShieldAlert,
  Wrench,
  MapPin,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  PhoneCall,
  LayoutGrid,
  MapPinCheck,
  FileText,
  Clock,
  Check,
  Phone,
  ArrowLeft,
  ChevronDown,
  HelpCircle,
  ShieldCheck,
  Star,
  ExternalLink,
  Menu,
  X,
  Send,
} from 'lucide-react';

interface ServiceIconProps {
  name: string;
  className?: string;
}

export const ServiceIcon: React.FC<ServiceIconProps> = ({ name, className = 'w-6 h-6' }) => {
  switch (name) {
    case 'Home':
      return <Home className={className} />;
    case 'Building2':
      return <Building2 className={className} />;
    case 'Armchair':
      return <Armchair className={className} />;
    case 'Layers':
      return <Layers className={className} />;
    case 'Droplets':
      return <Droplets className={className} />;
    case 'Wind':
      return <Wind className={className} />;
    case 'ShieldAlert':
      return <ShieldAlert className={className} />;
    case 'Wrench':
      return <Wrench className={className} />;
    case 'MapPin':
      return <MapPin className={className} />;
    case 'MessageSquare':
      return <MessageSquare className={className} />;
    case 'Sparkles':
      return <Sparkles className={className} />;
    case 'CheckCircle2':
      return <CheckCircle2 className={className} />;
    case 'PhoneCall':
      return <PhoneCall className={className} />;
    case 'LayoutGrid':
      return <LayoutGrid className={className} />;
    case 'MapPinCheck':
      return <MapPinCheck className={className} />;
    case 'FileText':
      return <FileText className={className} />;
    case 'Clock':
      return <Clock className={className} />;
    case 'Check':
      return <Check className={className} />;
    case 'Phone':
      return <Phone className={className} />;
    case 'ArrowLeft':
      return <ArrowLeft className={className} />;
    case 'ChevronDown':
      return <ChevronDown className={className} />;
    case 'HelpCircle':
      return <HelpCircle className={className} />;
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Star':
      return <Star className={className} />;
    case 'ExternalLink':
      return <ExternalLink className={className} />;
    case 'Menu':
      return <Menu className={className} />;
    case 'X':
      return <X className={className} />;
    case 'Send':
      return <Send className={className} />;
    default:
      return <Sparkles className={className} />;
  }
};
